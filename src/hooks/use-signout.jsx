import { useState, useEffect } from 'react';
import { useAuthContext } from './use-auth-context';
import { auth, signOut } from '../firebase/config';

export const useSignout = () => {
	const [isPending, setIsPending] = useState(false);
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const { dispatch } = useAuthContext();

	const signout = async () => {
		setIsPending(true);
		setError(null);

		try {
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
