import { useCollection } from '../../hooks/use-collection';
import ProjectList from '../../components/project-list';
import ProjectFilter from './project-filter';

const Dashboard = () => {
	const { documents, error } = useCollection('projects');

	return (
		<div>
			<h2 className="page-title">Dashboard</h2>

			{error && <p className="error">{error}</p>}

			{documents && <ProjectFilter />}

			{documents && <ProjectList projects={documents} />}
		</div>
	);
};

export default Dashboard;
