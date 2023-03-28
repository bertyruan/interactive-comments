import { User } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import authUser from "./auth.utils";

const db = getFirestore();

const onProfileChange = (callback: () => void) =>
  onSnapshot(doc(db, `users/${authUser.auth.currentUser?.uid}`), () => {
    callback();
  });

const createUserDocumentFromAuth = async (userAuth: User, args = {}) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    try {
      const { email, displayName } = userAuth;
      const createdAt = new Date();

      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...args,
      });
    } catch (error: any) {
      console.log(`There was an error creating user: ${error.message}`);
    }
  }

  return userDocRef;
};

const usersDoc = { db, createUserDocumentFromAuth, onProfileChange };

export default usersDoc;
