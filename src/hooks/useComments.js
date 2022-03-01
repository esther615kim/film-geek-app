import { useEffect, useReducer } from "react";

import { db } from '../firebase/config';
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

import { COMMENT_LOADING, COMMENT_LOADED, COMMENT_ADDED, COMMENT_MODIFIED, COMMENT_REMOVED, COMMENT_ERROR } from "./reducers/constants";
import commentReducer from "./reducers/commentReducer";

const COMMENTS_PATH = 'Comments';

const initialState = { isLoading: true, comments: [], hasError: false, errors: [] };

export default function useComments() {
  const [state, dispatch] = useReducer(commentReducer, initialState);

  // TODO DELETE Remove debugging code
  useEffect(() => {
    console.log('Current Comments State: ', state);
  }, [state]);

  useEffect(() => {
    dispatch({ type: COMMENT_LOADING });
    const q = query(collection(db, COMMENTS_PATH), orderBy("created_at", "desc"));
    dispatch({ type: COMMENT_LOADED });
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const comment = { comment_id: change.doc.id, ...change.doc.data() };
        if (change.type === "added") {
          dispatch({ type: COMMENT_ADDED, comment });
        }
        if (change.type === "modified") {
          dispatch({ type: COMMENT_MODIFIED, comment });
        }
        if (change.type === "removed") {
          dispatch({ type: COMMENT_REMOVED, comment });
        }
      });
    });
    
    return () => {
      try {
        unsubscribe();
      } catch (error) {
        dispatch({ type: COMMENT_ERROR, error })
        console.error("Comments unSub Error: ", error);
      }
    }
  }, []);

  return [state.isLoading, state.comments, state.hasError, state.errors];
}