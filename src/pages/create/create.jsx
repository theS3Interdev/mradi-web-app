import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useCollection } from '../../hooks/use-collection';

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
	const { documents } = useCollection('users');

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

		console.log(name, category.value, details, assignedUsers, dueDate);
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
