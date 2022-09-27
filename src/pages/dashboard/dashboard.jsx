import { useState } from 'react';
import { useCollection } from '../../hooks/use-collection';
import ProjectList from '../../components/project-list';
import ProjectFilter from './project-filter';

const Dashboard = () => {
	const [filter, setFilter] = useState('all');
	const { documents, error } = useCollection('projects');

	const changeFilter = (newFilter) => {
		setFilter(newFilter);
	};

	return (
		<div>
			<h2 className="page-title">Dashboard</h2>

			{error && <p className="error">{error}</p>}

			{documents && <ProjectFilter changeFilter={changeFilter} />}

			{documents && <ProjectList projects={documents} />}
		</div>
	);
};

export default Dashboard;
