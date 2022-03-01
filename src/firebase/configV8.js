// V8
// import firebase from "firebase/app";
// import "firebase/firestore"; 
// import "firebase/auth";

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxWA6AGezd0_Dn0D2hUwCblYtFqAxvTXI",
  authDomain: "webrtc-9f21d.firebaseapp.com",
  projectId: "webrtc-9f21d",
  storageBucket: "webrtc-9f21d.appspot.com",
  messagingSenderId: "1016942180459",
  appId: "1:1016942180459:web:65e5a9072265c53ac9192e"
};

// Initialize Firebase V8
firebase.initializeApp(firebaseConfig); // V8
export const firestore = firebase.firestore(); // V8
export const auth = firebase.auth(); // V8
export const provider = new firebase.auth.GoogleAuthProvider(); // V8

// Firebase V8 Implementation
export const signInWithGoogle = 
  function () { return auth.signInWithPopup(provider); };
export const signInWithRedirect = 
  function () { return auth.signInWithRedirect(provider); }
export const signInWithEmailAndPassword = 
  function (email, password) { return auth.signInWithEmailAndPassword(email, password); }
export const signOut = function () { return auth.signOut(); }
export const onAuthStateChanged = function ( fnCallback ) {
  return firebase.auth().onAuthStateChanged(fnCallback);
} 

// Example V8 Usage 
// onAuthStateChanged((user) => {
//   if (user) {
//     const { uid: user_id, email, displayName, photoURL } = user;
//     console.log('User Usage V8', { 
//       user_id, 
//       displayName: (displayName) ? displayName : email.substr(0, email.indexOf('@')),
//       email, photoURL
//     })
//     console.log('User has been logged in');
//     // { user_id, email, displayName, photoURL });
//     // LoggedIn = true
//   } else {
//     console.log('User has been logged out');
//     // User null
//     // LoggedIn = false
//   };
// });
