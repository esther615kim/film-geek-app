import { NOT_AUTHENTICATED, LOGGED_IN, LOGGED_OUT, AUTHENTICATION_ERROR } from "./constants";

/** Reducer */
// TODO Rewrite as state machine, if poss.
export default function authReducer(state, action) {
  switch (action.type) {
    // Initial State
    case NOT_AUTHENTICATED: {
      console.log("Auth Initialised State")
      return { ...state, isLoggedIn: false, hasError: false, errors: [], currentUser: null };
    }
    case LOGGED_IN: {
      console.log('user logged in ')
      return { ...state, isLoggedIn: true, currentUser: action.currentUser };
    }
    case LOGGED_OUT: {
      console.log('user logged out ')
      return { ...state, isLoggedIn: false, currentUser: null };
    }
    case AUTHENTICATION_ERROR: {
      console.log("An error occured: ", action.error);
      return { ...state, hasError: true, errors: [...state.errors, action.error] };
    }
    default:
      throw new Error("Reducer received unknown action: ", action);
  };
}
