// V9 Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { 
  getAuth, 
  signInWithPopup as SignInWithPopup,
  signInWithRedirect as SignInWithRedirect,
  signInWithEmailAndPassword as SignInWithEmailAndPassword, 
  signOut as SignOut, 
  onAuthStateChanged as OnAuthStateChanged, 
  GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjD5Tmf-_rPPs4LRoq9hfJlKal95lVgss",
  authDomain: "filmgeek-b6c1a.firebaseapp.com",
  projectId: "filmgeek-b6c1a",
  storageBucket: "filmgeek-b6c1a.appspot.com",
  messagingSenderId: "265459074244",
  appId: "1:265459074244:web:02df062bfc6c961bb7b591"
};

// Initialize Firebase V9
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Firebase V9 Implementation
export const signInWithGoogle = 
  function () { return SignInWithPopup(auth, provider); };
export const signInWithRedirect = 
  function () { return SignInWithRedirect(auth, provider); }
export const signInWithEmailAndPassword = 
  function (email, password) { return SignInWithEmailAndPassword(auth, email, password); }
export const signOut = function () { return SignOut(auth); }
export const onAuthStateChanged = function (fnCallBack)  { return OnAuthStateChanged(auth, fnCallBack ); }

// Example V9 Usage
// import { onAuthStateChanged } from "config.js"
// onAuthStateChanged((user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const user_id = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });
