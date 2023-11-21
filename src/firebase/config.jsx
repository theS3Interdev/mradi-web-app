import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  Timestamp,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

/** firebase configuration object containing keys and identifiers */
const firebaseConfig = {
  apiKey: "AIzaSyB2mYFiAl0i5wTUDeH9XyefcYyLAqEXj4w",
  authDomain: "mradi-project.firebaseapp.com",
  projectId: "mradi-project",
  storageBucket: "mradi-project.appspot.com",
  messagingSenderId: "1086608922552",
  appId: "1:1086608922552:web:5e9d8448afbd4501d5a14d",
  measurementId: "G-WVMLL31DVJ",
};

/** initialize firebase */
const app = initializeApp(firebaseConfig);

/** initialize firebase services */
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/** export services */
export {
  auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  db,
  Timestamp,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
};
