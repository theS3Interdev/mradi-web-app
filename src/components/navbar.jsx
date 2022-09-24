import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/use-auth-context';
import { useSignout } from '../hooks/use-signout';
import MradiLogo from '../assets/mradi.svg';

const Navbar = () => {
	const { signout, isPending } = useSignout();
	const { user } = useAuthContext();

	return (
		<nav className="navbar">
			<ul>
				<li className="logo">
					<img src={MradiLogo} alt="Mradi Logo" />
					<Link to="/">Mradi Project Management</Link>
				</li>

				{!user && (
					<>
						<li>
							<Link to="/signin">Sign in</Link>
						</li>
						<li>
							<Link to="/signup">Sign up</Link>
						</li>
					</>
				)}

				{user && (
					<li>
						{!isPending && (
							<button className="btn" onClick={signout}>
								Sign out
							</button>
						)}

						{isPending && (
							<button className="btn" disabled>
								Signing out...
							</button>
						)}
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
