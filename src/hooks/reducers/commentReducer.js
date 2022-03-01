import { COMMENT_LOADING, COMMENT_LOADED, COMMENT_ADDED, COMMENT_MODIFIED, COMMENT_REMOVED, COMMENT_ERROR } from "./constants";

export default function commentReducer(state, action) {
  switch (action.type) {
    // Initial State
    case COMMENT_LOADING: {
      console.log("Initial Comment State")
      return { ...state, isLoading: true};
    }
    case COMMENT_LOADED: {
      console.log('Loaded Comment State')
      return { ...state, isLoading: false };
    }
    case COMMENT_ADDED: {
      return { ...state, comments: [ action.comment, ...state.comments] }; // Add new at front for now for convenience
    }
    case COMMENT_MODIFIED: {
        return { 
          ...state, 
          comments: state.comments.map(
            comment => (comment.id === action.comment_id)
              ? action.comment
              : comment)
        };
    }
    case COMMENT_REMOVED: {
      return { 
        ...state, 
        comments: state.comments.filter(
          comment => (comment.id !== action.comment_id))
      };
    }
    case COMMENT_ERROR: {
      console.log("An error occured: ", action.error);
      return { ...state, hasError: true, errors: [...state.errors, action.error] };
    }
    default:
      throw new Error("Reducer received unknown action: ", action);
  };
}