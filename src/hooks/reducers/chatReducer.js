import { CHAT_LOADING, CHAT_LOADED, CHAT_ADDED, CHAT_MODIFIED, CHAT_REMOVED, CHAT_ERROR } from "./constants";


export default function chatReducer(state, action) {
  switch (action.type) {
    // Initial State
    case CHAT_LOADING: {
      console.log("Initial Chat State")
      return { ...state, isLoading: true};
    }
    case CHAT_LOADED: {
      console.log('Loaded Chat State')
      return { ...state, isLoading: false };
    }
    case CHAT_ADDED: {
      return { ...state, messages: [ action.message, ...state.messages] }; // Add new at front for now for convenience
    }
    case CHAT_MODIFIED: {
        return { 
          ...state, 
          messages: state.messages.map(
            message => (message.id === action.message_id)
              ? action.message
              : message)
        };
    }
    case CHAT_REMOVED: {
      return { 
        ...state, 
        messages: state.messages.filter(
          message => (message.id !== action.message_id))
      };
    }
    case CHAT_ERROR: {
      console.log("An error occured: ", action.error);
      return { ...state, hasError: true, errors: [...state.errors, action.error] };
    }
    default:
      throw new Error("Reducer received unknown action: ", action);
  };
}