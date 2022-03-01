import { useEffect, useReducer } from "react";

import { db } from '../firebase/config';
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { CHAT_LOADING, CHAT_LOADED, CHAT_ADDED, CHAT_MODIFIED, CHAT_REMOVED, CHAT_ERROR } from "./reducers/constants";
import chatReducer from "./reducers/chatReducer";

const CHAT_MESSAGES_PATH = 'msgs';

const initialState = { isLoading: true, messages: [], hasError: false, errors: [] };

export default function useChat(username) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // TODO DELETE Remove debugging code
  useEffect(() => {
    console.log('Current Chat State: ', state);
  }, [state]);

  useEffect(() => {
    dispatch({ type: CHAT_LOADING });
    const q = query(collection(db, CHAT_MESSAGES_PATH), where("username", "==", username));
    dispatch({ type: CHAT_LOADED });
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const message = { message_id: change.doc.id, ...change.doc.data() }; // OR split docId and docData?
        if (change.type === "added") {
          dispatch({ type: CHAT_ADDED, message });
        }
        if (change.type === "modified") {
          dispatch({ type: CHAT_MODIFIED, message });
        }
        if (change.type === "removed") {
          dispatch({ type: CHAT_REMOVED, message });
        }
      });
    });
    
    return () => {
      try {
        unsubscribe();
      } catch (error) {
        dispatch({ type: CHAT_ERROR, error })
        console.error("Chat unSub Error: ", error);
      }
    }
  }, []);

  return [state.isLoading, state.messages, state.hasError, state.errors];
}