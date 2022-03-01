import { fsDateToJsDate } from './utils';
import { db } from "../firebase/config";

import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  deleteDoc
} from "firebase/firestore";

/** Comments */
export async function postUserComment(newComment) {
  try {
    const addComment = { ...newComment, created_at: Timestamp.now() }; // TODO Should be done on server
    const docRef = await addDoc(collection(db, "Comments"), addComment);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

/** Chat */
export async function postUserMessage(newMessage) {
  try {
    console.log('new msg', newMessage)
    const addMessage = { ...newMessage, created_at: Timestamp.now() }; // TODO Should be done on server
    const docRef = await addDoc(collection(db, "Messages"), addMessage);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getComments() {
  try {
    const comments = [];
    const q = query(collection(db, "Comments"), orderBy("created_at", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.data());
      const comment = { comment_id: doc.id, ...doc.data() };
      comments.push({ ...comment, created_at: fsDateToJsDate(comment.created_at) } );
    });
    return comments;
  } catch (e) {
    console.error("Error getting comments: ", e);
  }
}

export async function getUserComments(username) {
  try {
    const querySnapshot = await getDocs(collection(db, "Comments"),
      where("username", "==", username)
    );
    const comments = [];
    querySnapshot.forEach((doc) => {
      //console.log(doc.data());
//      comments.push({ comment_id: doc.id, ...doc.data() });
      const comment = { comment_id: doc.id, ...doc.data() };
      comments.push({ ...comment, created_at: fsDateToJsDate(comment.created_at) } );
    });

    return comments;
  } catch (e) {
    console.error("Error getting user's comments: ", e);
  }
}

export async function deleteComment(comment_id) {
  await deleteDoc(doc(db, "Comments", comment_id));
}