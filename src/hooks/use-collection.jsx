import { useState, useEffect, useRef } from 'react';
import { db, collection, onSnapshot, query, where, orderBy } from '../firebase/config';

export const useCollection = (col, _qry, _ord) => {
	const [documents, setDocuments] = useState(null);
	const [error, setError] = useState(null);

	const qry = useRef(_qry).current;
	const ord = useRef(_ord).current;

	useEffect(() => {
		let ref = collection(db, col);

		if (qry) {
			ref = query(ref, where(...qry));
		}

		if (ord) {
			ref = query(ref, orderBy(...ord));
		}

		const unsubscribe = onSnapshot(
			ref,
			(snapshot) => {
				let results = [];

				snapshot.docs.forEach((doc) => {
					results.push({ id: doc.id, ...doc.data() });
				});

				/** update state */
				setDocuments(results);
				setError(null);
			},
			(error) => {
				console.log(error);
				setError('Could not fetch the data');
			}
		);

		/** unsubscribe on unmount */
		return () => unsubscribe();
	}, [col, qry, ord]);

	return { documents, error };
};
