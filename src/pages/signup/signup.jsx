import { useState } from 'react';
import { useSignup } from '../../hooks/use-signup';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [thumbnail, setThumbnail] = useState(null);
	const [thumbnailError, setThumbnailError] = useState(null);
	const { signup, isPending, error } = useSignup();

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(email, password, displayName, thumbnail);
	};

	const handleFileChange = (e) => {
		setThumbnail(null);

		let selected = e.target.files[0];

		if (!selected) {
			setThumbnailError('Please select a file');
			return;
		}

		if (!selected.type.includes('image')) {
			setThumbnailError('Selected file must be an image');
			return;
		}

		if (selected.size > 512000) {
			setThumbnailError('Image file size must be less than 500kb');
			return;
		}

		setThumbnail(selected);
		setThumbnailError(null);
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

			<label>
				<span>Display Name:</span>
				<input
					type="text"
					onChange={(e) => setDisplayName(e.target.value)}
					value={displayName}
					required
					className="rounded"
				/>
			</label>

			<label>
				<span>Profile Thumbnail:</span>
				<input type="file" onChange={handleFileChange} required className="rounded" />

				{thumbnailError && <div className="error">{thumbnailError}</div>}
			</label>

			{!isPending && <button className="btn">Sign Up</button>}

			{isPending && (
				<button className="btn" disabled>
					Loading...
				</button>
			)}

			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default Signup;
