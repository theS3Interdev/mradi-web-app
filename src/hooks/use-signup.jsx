import { useState, useEffect } from 'react';
import { useAuthContext } from './use-auth-context';
import {
	auth,
	createUserWithEmailAndPassword,
	updateProfile,
	storage,
	ref,
	uploadBytes,
	getDownloadURL,
} from '../firebase/config';

export const useSignup = () => {
	const [isPending, setIsPending] = useState(false);
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const { dispatch } = useAuthContext();

	const signup = async (email, password, displayName, thumbnail) => {
		setIsPending(true);
		setError(null);

		try {
			/** signup procedure */
			const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

			if (!userCredentials) {
				throw new Error('Could not complete the sign up procedure');
			}

			/** upload user thumbnail */
			const uploadPath = `thumbnails/${userCredentials.user.uid}/${thumbnail.name}`;
			const storageRef = await ref(storage, uploadPath);
			const uploadTask = await uploadBytes(storageRef, thumbnail);
			const imageUrl = await getDownloadURL(uploadTask);

			/** add the display name to the user profile */
			await updateProfile(auth.currentUser, { displayName, photoUrl: imageUrl });

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
