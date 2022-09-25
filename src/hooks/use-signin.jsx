import { useState, useEffect } from 'react';
import { useAuthContext } from './use-auth-context';
import { auth, signInWithEmailAndPassword, db, doc, updateDoc } from '../firebase/config';

export const useSignin = () => {
	const [isPending, setIsPending] = useState(false);
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const { dispatch } = useAuthContext();

	const signin = async (email, password) => {
		setError(null);
		setIsPending(true);

		try {
			/** signin procedure */
			const userCredential = await signInWithEmailAndPassword(auth, email, password);

			/** update online status */
			await updateDoc(doc(db, 'users', userCredential.user.uid), { online: true });

			/** dispatch signin action */
			dispatch({ type: 'SIGNIN', payload: userCredential.user });

			/** update state */
			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			if (!isCancelled) {
				setError(err.message);
				setIsPending(false);
			}
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { signin, isPending, error };
};
