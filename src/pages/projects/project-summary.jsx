import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/use-auth-context';
import { useFirestore } from '../../hooks/use-firestore';
import Avatar from '../../components/avatar';

const ProjectSummary = ({ project }) => {
	const { user } = useAuthContext();
	const { deleteDocument } = useFirestore('projects');

	let navigate = useNavigate();

	/** delete document and navigate to the dashboard */
	const handleClick = () => {
		deleteDocument(project.id);
		navigate('/');
	};

	return (
		<div>
			<div className="project-summary">
				<h2 className="page-title">{project.name}</h2>
				<p>Project Lead: {project.createdBy.displayName}</p>
				<p className="due-date">
					Project due by {project.dueDate.toDate().toDateString()}
				</p>
				<p className="details">{project.details}</p>
				<h4>Project assigned to:</h4>
				<div className="assigned-users">
					{project.assignedUsersList.map((user) => (
						<div key={user.id}>
							<Avatar src={user.photoURL} />
						</div>
					))}
				</div>
			</div>
			{user.uid === project.createdBy.id && (
				<button className="btn" onClick={handleClick}>
					Project Complete
				</button>
			)}
		</div>
	);
};

export default ProjectSummary;
