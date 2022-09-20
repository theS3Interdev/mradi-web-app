import { useState, useEffect } from 'react';
import { useAuthContext } from './use-auth-context';
import { auth, createUserWithEmailAndPassword, updateProfile } from '../firebase/config';

export const useSignup = () => {
	const [isPending, setIsPending] = useState(false);
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const { dispatch } = useAuthContext();

	const signup = async (email, password, displayName) => {
		setIsPending(true);
		setError(null);

		try {
			/** signup procedure */
			const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

			if (!userCredentials) {
				throw new Error('Could not complete the sign up procedure');
			}

			/** add the display name to the user profile */
			await updateProfile(auth.currentUser, { displayName });

			/** dispatch signin action */
			dispatch({ type: 'SIGNIN', payload: userCredentials.user });

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

	return { signup, isPending, error };
};
