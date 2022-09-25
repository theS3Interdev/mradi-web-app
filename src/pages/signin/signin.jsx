import { useState } from 'react';
import { useSignin } from '../../hooks/use-signin';

const Signin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { signin, isPending, error } = useSignin();

	const handleSubmit = (e) => {
		e.preventDefault();
		signin(email, password);
	};

	return (
		<form onSubmit={handleSubmit} className="auth-form">
			<h2 className="page-title">Sign in</h2>
			<label>
				<span>Email:</span>
				<input
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
					className="rounded"
				/>
			</label>

			<label>
				<span>Password:</span>
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					required
					className="rounded"
				/>
			</label>

			{!isPending && <button className="btn">Sign in</button>}

			{isPending && (
				<button className="btn" disabled>
					Loading...
				</button>
			)}

			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default Signin;
