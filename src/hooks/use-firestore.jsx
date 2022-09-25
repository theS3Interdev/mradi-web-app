import { useReducer, useEffect, useState } from 'react';
import { db, collection, Timestamp, addDoc, doc, deleteDoc } from '../firebase/config';

let initialState = { success: null, isPending: false, error: null, document: null };

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case 'IS_PENDING':
			return { success: false, isPending: true, error: null, document: null };
		case 'ADDED_DOCUMENT':
			return { success: true, isPending: false, error: null, document: action.payload };
		case 'DELETED_DOCUMENT':
			return { success: true, isPending: false, error: null, document: null };
		case 'ERROR':
			return { success: false, isPending: false, error: action.payload, document: null };
		default:
			return state;
	}
};

export const useFirestore = (col) => {
	const [response, dispatch] = useReducer(firestoreReducer, initialState);
	const [isCancelled, setIsCancelled] = useState(false);

	/** only dispatch if not cancelled */
	const dispatchIfNotCancelled = (action) => {
		if (!isCancelled) {
			dispatch(action);
		}
	};

	/** add a document */
	const addDocument = async (_doc) => {
		const ref = collection(db, col);

		dispatch({ type: 'IS_PENDING' });

		try {
			const createdAt = Timestamp.fromDate(new Date());
			const addedDocument = await addDoc(ref, { ..._doc, createdAt });

			dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
		} catch (err) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
		}
	};

	/** delete a document */
	const deleteDocument = async (id) => {
		const ref = doc(db, col, id);

		dispatch({ type: 'IS_PENDING' });

		try {
			await deleteDoc(ref);

			dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
		} catch (err) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { addDocument, deleteDocument, response };
};
