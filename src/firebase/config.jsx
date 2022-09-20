import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/** firebase configuration object containing keys and identifiers */
const firebaseConfig = {
	apiKey: 'AIzaSyCEeN2iW3kanhs0RkyIqdT6iuZ1FkLRkmU',
	authDomain: 'mradi-project-management.firebaseapp.com',
	projectId: 'mradi-project-management',
	storageBucket: 'mradi-project-management.appspot.com',
	messagingSenderId: '1063077288181',
	appId: '1:1063077288181:web:aaf558018c1ed87c41cdbc',
	measurementId: 'G-TNKCHGFL29',
};

/** initialize firebase */
const app = initializeApp(firebaseConfig);

/** initialize firebase services */
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/** export services */
export { auth, db, serverTimestamp, storage };
