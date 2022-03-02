/** Reducer Actions */

/** Auth */
// States
export const NOT_AUTHENTICATED = "NOT_AUTHENTICATED"; // Initial State
//const SIGN_IN = "SIGN_IN";
//const SIGN_OUT = "SIGN_OUT";
//const SIGN_IN_FAILED = "SIGN_IN_FAILED";
// Actions - (event + state [updated state])
export const LOGGED_IN = "LOGGED_IN";
export const LOGGED_OUT = "LOGGED_OUT";
export const AUTHENTICATION_ERROR = "ERROR";

/** Comments */
export const COMMENT_LOADING = "COMMENT_LOADING";
export const COMMENT_LOADED = "COMMENT_LOADED";
export const COMMENT_ADDED = "COMMENT_ADDED";
export const COMMENT_MODIFIED = "COMMENT_MODIFIED";
export const COMMENT_REMOVED = "COMMENT_REMOVED";
export const COMMENT_ERROR = "COMMENT_ERROR";

/** Chat */
export const CHAT_LOADING = "CHAT_LOADING";
export const CHAT_LOADED = "CHAT_LOADED";
export const CHAT_ADDED = "CHAT_ADDED";
export const CHAT_MODIFIED = "CHAT_MODIFIED";
export const CHAT_REMOVED = "CHAT_REMOVED";
export const CHAT_ERROR = "CHAT_ERROR";
