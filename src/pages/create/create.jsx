import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useAuthContext } from '../../hooks/use-auth-context';
import { useFirestore } from '../../hooks/use-firestore';
import { useCollection } from '../../hooks/use-collection';
import { Timestamp } from '../../firebase/config';

const categories = [
	{ value: 'development', label: 'Development' },
	{ value: 'design', label: 'Design' },
	{ value: 'sales', label: 'Sales' },
	{ value: 'marketing', label: 'Marketing' },
];

const Create = () => {
	/** form field values */
	const [name, setName] = useState('');
	const [details, setDetails] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [category, setCategory] = useState('');
	const [assignedUsers, setAssignedUsers] = useState([]);
	const [formError, setFormError] = useState(null);

	const [users, setUsers] = useState([]);
	const { user } = useAuthContext();
	const { addDocument, response } = useFirestore('projects');
	const { documents } = useCollection('users');

	let navigate = useNavigate();

	/** create user values for react-select */
	useEffect(() => {
		if (documents) {
			setUsers(
				documents.map((user) => {
					return { value: { ...user, id: user.id }, label: user.displayName };
				})
			);
		}
	}, [documents]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setFormError(null);

		if (!category) {
			setFormError('Please select a project category');
			return;
		}

		if (assignedUsers.length < 1) {
			setFormError('Please assign a user to the project');
			return;
		}

		const assignedUsersList = assignedUsers.map((u) => {
			return {
				displayName: u.value.displayName,
				photoURL: u.value.photoURL,
				id: u.value.id,
			};
		});

		const createdBy = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			id: user.uid,
		};

		const project = {
			name,
			category: category.value,
			details,
			assignedUsersList,
			dueDate: Timestamp.fromDate(new Date(dueDate)),
			comments: [],
			createdBy,
		};

		/** add document to the project collection */
		await addDocument(project);

		/** navigate to home page if there is no error */
		if (!response.error) {
			navigate('/');
		}
	};

	return (
		<div className="create-form">
			<h2 className="page-title">Create a New Project</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Project Name</span>
					<input
						required
						type="text"
						onChange={(e) => setName(e.target.value)}
						value={name}
						className="rounded"
					/>
				</label>

				<label>
					<span>Project Category</span>
					<Select
						onChange={(option) => setCategory(option)}
						options={categories}
						className="rounded"
					/>
				</label>

				<label>
					<span>Project Details</span>
					<textarea
						required
						onChange={(e) => setDetails(e.target.value)}
						value={details}
						className="rounded"
					></textarea>
				</label>

				<label>
					<span>Assign To</span>
					<Select
						onChange={(option) => setAssignedUsers(option)}
						options={users}
						isMulti
					/>
				</label>

				<label>
					<span>Due Date</span>
					<input
						required
						type="date"
						onChange={(e) => setDueDate(e.target.value)}
						value={dueDate}
						className="rounded"
					/>
				</label>

				<button className="btn">Add Project</button>

				{formError && <p className="error">{formError}</p>}
			</form>
		</div>
	);
};

export default Create;
