import { Link } from 'react-router-dom';
import MradiLogo from '../assets/mradi.svg';

const Navbar = () => {
	return (
		<nav className="navbar">
			<ul>
				<li className="logo">
					<img src={MradiLogo} alt="Mradi Logo" />
					<Link to="/">Mradi by S3</Link>
				</li>

				<li>
					<Link to="/signin">Sign In</Link>
				</li>
				<li>
					<Link to="/signup">Sign Up</Link>
				</li>
				<li>
					<button className="btn">Sign Out</button>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
