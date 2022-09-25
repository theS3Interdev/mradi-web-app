import { Link } from 'react-router-dom';
import Avatar from '../components/avatar';

const ProjectList = ({ projects }) => {
	return (
		<div className="project-list">
			{projects.length === 0 && <p>There are currently no projects...</p>}

			{projects.map((project) => (
				<Link to={`/projects/${project.id}`} key={project.id}>
					<h4>{project.name}</h4>
					<p>Due Date {project.dueDate.toDate().toDateString()}</p>
					<div className="assigned-to">
						<p>
							<strong>Assigned To</strong>
						</p>
						<ul>
							{project.assignedUsersList.map((user) => (
								<li key={user.photoURL}>
									<Avatar src={user.photoURL} />
								</li>
							))}
						</ul>
					</div>
				</Link>
			))}
		</div>
	);
};

export default ProjectList;
