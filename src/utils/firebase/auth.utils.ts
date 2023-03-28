// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User,
  updateProfile,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbvLbNp_gvAvguylAbr6anye9rzF7f6fo",
  authDomain: "react-capstone-crown.firebaseapp.com",
  projectId: "react-capstone-crown",
  storageBucket: "react-capstone-crown.appspot.com",
  messagingSenderId: "51123480418",
  appId: "1:51123480418:web:62e23a7edd62ba5f9d2e3b",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

const authUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const newUserWithEmailAndPassword = async (username: string) => {
  if (!username) return null;
  const email = `${username}@bertydev.com`;
  const currentUser = await createUserWithEmailAndPassword(
    auth,
    email,
    "helloworld"
  );
  await updateProfile(currentUser.user, { displayName: username });
};

const userSignOut = async () => await signOut(auth);

const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

const authUser = {
  authUserWithEmailAndPassword,
  newUserWithEmailAndPassword,
  userSignOut,
  onAuthStateChangedListener,
  auth,
};

export default authUser;
