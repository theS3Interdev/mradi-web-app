import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from '../../hooks/use-auth-context';
import { useFirestore } from '../../hooks/use-firestore';
import { Timestamp } from '../../firebase/config';

const ProjectComments = ({ project }) => {
	const { user } = useAuthContext();
	const { updateDocument, response } = useFirestore('projects');
	const [newComment, setNewComment] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const commentToAdd = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			content: newComment,
			createdAt: Timestamp.fromDate(new Date()),
			id: uuidv4(),
		};

		/** add comment to the project collection */
		await updateDocument(project.id, { comments: [...project.comments, commentToAdd] });

		/** clear comment field if there is no error */
		if (!response.error) {
			setNewComment('');
		}
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
