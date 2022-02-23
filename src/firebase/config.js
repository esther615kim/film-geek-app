// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_QuV77NV_SL4Naqn6XEeC7T2Jk9jE-Gg",
  authDomain: "react-project-app-7e8f4.firebaseapp.com",
  projectId: "react-project-app-7e8f4",
  storageBucket: "react-project-app-7e8f4.appspot.com",
  messagingSenderId: "299392956787",
  appId: "1:299392956787:web:d90f12d43af9a26462ad06",
  measurementId: "G-JWMKN3X049"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {getFirestore} from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyAjD5Tmf-_rPPs4LRoq9hfJlKal95lVgss",
//   authDomain: "filmgeek-b6c1a.firebaseapp.com",
//   projectId: "filmgeek-b6c1a",
//   storageBucket: "filmgeek-b6c1a.appspot.com",
//   messagingSenderId: "265459074244",
//   appId: "1:265459074244:web:02df062bfc6c961bb7b591"
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// export const db = getFirestore();