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
	db,
	doc,
	setDoc,
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
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);

			if (!userCredential) {
				throw new Error('Could not complete the sign up procedure');
			}

			/** create storage reference */
			const uploadPath = `thumbnails/${userCredential.user.uid}/${thumbnail.name}`;
			const storageRef = ref(storage, uploadPath);

			/** upload user thumbnail to cloud storage */
			await uploadBytes(storageRef, thumbnail);

			/** get the download url */
			const imageURL = await getDownloadURL(storageRef);

			/** add the display name and photo url to the user profile */
			await updateProfile(auth.currentUser, { displayName, photoURL: imageURL });

			/** add a new document in collection "users" */
			await setDoc(doc(db, 'users', userCredential.user.uid), {
				online: true,
				displayName,
				photoURL: imageURL,
			});

			/** dispatch signin action */
			dispatch({ type: 'SIGNIN', payload: userCredential.user });

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
