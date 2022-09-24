import { useCollection } from '../hooks/use-collection';
import Avatar from './avatar';

const OnlineUsers = () => {
	const { documents, isPending, error } = useCollection('users');

	return (
		<div className="user-list">
			<h2>All Users</h2>
			{isPending && <div>Loading users...</div>}

			{error && <div className="error">{error}</div>}

			{documents &&
				documents.map((user) => (
					<div key={user.id} className="user-list-item">
						<span>{user.displayName}</span>
						<Avatar src={user.photoURL} />
					</div>
				))}
		</div>
	);
};

export default OnlineUsers;
