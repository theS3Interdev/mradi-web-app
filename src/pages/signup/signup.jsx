import { useState } from 'react';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [thumbnail, setThumbnail] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, password, displayName);
	};

	return (
		<form onSubmit={handleSubmit} className="auth-form">
			<h2 className="font-semibold uppercase">Sign Up</h2>
			<label>
				<span>Email:</span>
				<input
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
					className="rounded-lg"
				/>
			</label>

			<label>
				<span>Password:</span>
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					required
					className="rounded-lg"
				/>
			</label>

			<label>
				<span>Display Name:</span>
				<input
					type="text"
					onChange={(e) => setDisplayName(e.target.value)}
					value={displayName}
					required
					className="rounded-lg"
				/>
			</label>

			<label>
				<span>Profile Thumbnail:</span>
				<input required type="file" />
			</label>

			<button className="btn">Sign Up</button>
		</form>
	);
};

export default Signup;
