import { useState } from 'react';
import { useAuthContext } from '../../hooks/use-auth-context';
import { Timestamp } from '../../firebase/config';

const ProjectComments = () => {
	const { user } = useAuthContext();
	const [newComment, setNewComment] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const commentToAdd = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			content: newComment,
			createdAt: Timestamp.fromDate(new Date()),
			id: Math.random(),
		};

		console.log(commentToAdd);
	};

	return (
		<div className="project-comments">
			<h4 className="font-semibold">Project Comments</h4>

			<form className="add-comment" onSubmit={handleSubmit}>
				<label>
					<span>Add a New Comment</span>
					<textarea
						required
						onChange={(e) => setNewComment(e.target.value)}
						value={newComment}
					></textarea>
				</label>
				<button className="btn">Add Comment</button>
			</form>
		</div>
	);
};

export default ProjectComments;
