import { NavLink } from 'react-router-dom';
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';

const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="sidebar-content">
				<div className="user">
					{/* avatar and username will go here later */}
					<p>Hey user</p>
				</div>
				<nav className="links">
					<ul>
						<li>
							<NavLink to="/">
								<img src={DashboardIcon} alt="Dashboard Icon" />
								<span>Dashboard</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/create">
								<img src={AddIcon} alt="Add Project Icon" />
								<span>New Project</span>
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Sidebar;
