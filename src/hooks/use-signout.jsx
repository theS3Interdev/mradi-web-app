import { useState, useEffect } from 'react';
import { useAuthContext } from './use-auth-context';
import { auth, signOut, db, doc, updateDoc } from '../firebase/config';

export const useSignout = () => {
	const [isPending, setIsPending] = useState(false);
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const { dispatch, user } = useAuthContext();

	const signout = async () => {
		setIsPending(true);
		setError(null);

		try {
			/** set the "online" field of the user to 'false' */
			const { uid } = user;

			await updateDoc(doc(db, 'users', uid), { online: false });

			/** signout procedure */
			await signOut(auth);

			/** dispatch signout action */
			dispatch({ type: 'SIGNOUT' });

			/** update state */
			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			if (!isCancelled) {
				setIsPending(false);
				setError(err.message);
			}
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { signout, isPending, error };
};
