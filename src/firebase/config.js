
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAjD5Tmf-_rPPs4LRoq9hfJlKal95lVgss",
  authDomain: "filmgeek-b6c1a.firebaseapp.com",
  projectId: "filmgeek-b6c1a",
  storageBucket: "filmgeek-b6c1a.appspot.com",
  messagingSenderId: "265459074244",
  appId: "1:265459074244:web:02df062bfc6c961bb7b591"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
