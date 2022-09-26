import { useReducer, useEffect, useState } from 'react';
import {
	db,
	collection,
	Timestamp,
	doc,
	addDoc,
	updateDoc,
	deleteDoc,
} from '../firebase/config';

let initialState = { success: null, isPending: false, error: null, document: null };

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case 'IS_PENDING':
			return { success: false, isPending: true, error: null, document: null };
		case 'ADDED_DOCUMENT':
			return { success: true, isPending: false, error: null, document: action.payload };
		case 'UPDATED_DOCUMENT':
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
		dispatch({ type: 'IS_PENDING' });

		try {
			const createdAt = Timestamp.fromDate(new Date());
			const addedDocument = await addDoc(collection(db, col), { ..._doc, createdAt });

			dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
		} catch (err) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
		}
	};

	/** update a document */
	const updateDocument = async (id, updates) => {
		dispatch({ type: 'IS_PENDING' });

		try {
			const updatedDocument = await updateDoc(doc(db, col, id), updates);

			dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument });
			return updatedDocument;
		} catch (err) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
		}
	};

	/** delete a document */
	const deleteDocument = async (id) => {
		dispatch({ type: 'IS_PENDING' });

		try {
			await deleteDoc(doc(db, col, id));

			dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
		} catch (err) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { addDocument, updateDocument, deleteDocument, response };
};
