import { useState } from 'react';

const Signin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, password);
	};

	return (
		<form onSubmit={handleSubmit} className="auth-form">
			<h2 className="font-semibold uppercase">Sign In</h2>
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

			<button className="btn">Sign In</button>
		</form>
	);
};

export default Signin;
