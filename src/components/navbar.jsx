import { Link } from 'react-router-dom';
import { useSignout } from '../hooks/use-signout';
import MradiLogo from '../assets/mradi.svg';

const Navbar = () => {
	const { signout, isPending } = useSignout();

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
					{!isPending && (
						<button className="btn" onClick={signout}>
							Sign Out
						</button>
					)}

					{isPending && (
						<button className="btn" disabled>
							Signing Out...
						</button>
					)}
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
