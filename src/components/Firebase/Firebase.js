import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,

  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,

  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

class Firebase {
  constructor() {
    // initalize app
    this.app = initializeApp(config);

    // Initialize Firebase Authentication and get a reference to the service
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
  }

  onAuthStateChanged = (setUserSession, navigate) =>
    onAuthStateChanged(this.auth, (user) => {
      user ? setUserSession(user) : navigate("/");
    });

  // inscription
  signupUser = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  // connexion
  loginUser = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  // Deconnexion

  signoutUser = () => this.auth.signOut();

  // Récupérer le mot de passe

  passwordReset = (email) => sendPasswordResetEmail(this.auth, email);

  getDoc = (uid) => getDoc(doc(this.db, `users/${uid}`), "pseudo", "email");

  user = (uid, pseudo, email) =>
    setDoc(doc(this.db, `users/${uid}`), { pseudo: pseudo, email: email });
}
export default Firebase;
