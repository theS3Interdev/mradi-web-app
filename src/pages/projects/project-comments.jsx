import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../../hooks/use-auth-context';
import { useFirestore } from '../../hooks/use-firestore';
import { Timestamp } from '../../firebase/config';
import Avatar from '../../components/avatar';

const ProjectComments = ({ project }) => {
	const { user } = useAuthContext();
	const { updateDocument, response } = useFirestore('projects');
	const [newComment, setNewComment] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const commentToAdd = {
			id: uuidv4(),
			displayName: user.displayName,
			photoURL: user.photoURL,
			content: newComment,
			createdAt: Timestamp.fromDate(new Date()),
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
			<h4>Project Comments</h4>

			<ul>
				{project.comments.length > 0 &&
					project.comments.map((comment) => (
						<li key={comment.id}>
							<div className="comment-author">
								<Avatar src={comment.photoURL} />
								<p>{comment.displayName}</p>
							</div>
							<div className="comment-date">
								<p>
									{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}
								</p>
							</div>
							<div className="comment-content">
								<p>{comment.content}</p>
							</div>
						</li>
					))}
			</ul>

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
