import { useEffect, useReducer } from 'react';
import { onAuthStateChanged } from '../firebase/config';

import { NOT_AUTHENTICATED, LOGGED_IN, LOGGED_OUT, AUTHENTICATION_ERROR } from "./reducers/constants";
import authReducer from "./reducers/authReducer";

export default function useAuth() {
  const [state, dispatch] = useReducer(authReducer, {});

  // TODO DELETE Remove debugging code 
  useEffect(() => {
    console.log('Current Auth State: ', state);
  }, [state]);

  useEffect(() => {
    dispatch({ type: NOT_AUTHENTICATED });
    let subAuth = onAuthStateChanged((user) => {
      if (user) {
        const { uid: user_id, email, displayName, photoURL } = user;
        console.log('User has been signed in');
        dispatch({ type: LOGGED_IN, currentUser: { user_id, email, displayName, photoURL } });
      } else {
        console.log('User has been signed out');
        dispatch({ type: LOGGED_OUT });
      };
    });
    return () => {
      try {
        subAuth();
      } catch (error) {
        dispatch({ type: AUTHENTICATION_ERROR, error })
        console.error("Auth unSub Error: ", error);
      }
    }
  }, []);

  return [state.isLoggedIn, state.currentUser, state.hasError, state.errors];
}