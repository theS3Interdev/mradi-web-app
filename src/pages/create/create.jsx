import { useState } from 'react';

const Create = () => {
	/** form field values */
	const [name, setName] = useState('');
	const [details, setDetails] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [category, setCategory] = useState('');
	const [assignedUsers, setAssignedUsers] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(name, details, dueDate);
	};

	return (
		<div className="create-form">
			<h2 className="page-title">Create a New Project</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Project Name:</span>
					<input
						required
						type="text"
						onChange={(e) => setName(e.target.value)}
						value={name}
						className="rounded"
					/>
				</label>

				<label>
					<span>Project Details:</span>
					<textarea
						required
						onChange={(e) => setDetails(e.target.value)}
						value={details}
						className="rounded"
					></textarea>
				</label>

				<label>
					<span>Due Date:</span>
					<input
						required
						type="date"
						onChange={(e) => setDueDate(e.target.value)}
						value={dueDate}
						className="rounded"
					/>
				</label>

				<label>
					<span>Project Category:</span>
					{/* select here later */}
				</label>

				<label>
					<span>Assign To:</span>
					{/* select here later */}
				</label>

				<button className="btn">Add Project</button>
			</form>
		</div>
	);
};

export default Create;
