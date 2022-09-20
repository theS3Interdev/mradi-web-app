import { createContext, useReducer, useEffect } from 'react';
import { auth, onAuthStateChanged } from '../firebase/config';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
	switch (action.type) {
		case 'SIGNIN':
			return { ...state, user: action.payload };
		case 'SIGNOUT':
			return { ...state, user: null };
		case 'AUTH_IS_READY':
			return { user: action.payload, authIsReady: true };
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		authIsReady: false,
	});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			dispatch({ type: 'AUTH_IS_READY', payload: user });
			unsubscribe();
		});
	}, []);

	/** for visual confirmation purposes */
	console.log('Authentication State: ', state);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
	);
};
