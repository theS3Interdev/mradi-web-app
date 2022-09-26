import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/use-document';
import ProjectSummary from './project-summary';

const Project = () => {
	let { id } = useParams();
	const { document, error } = useDocument('projects', id);

	if (error) {
		return <div className="error">{error}</div>;
	}

	if (!document) {
		return <div className="loading">Loading...</div>;
	}

	return (
		<div className="project-details">
			<ProjectSummary project={document} />
		</div>
	);
};

export default Project;
