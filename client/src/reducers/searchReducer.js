import { POST_SEARCHRESULT } from "../actions/types";

const initialState = {
  movie: null,
  movies: null
  // loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_SEARCHRESULT:
      return {
        ...state,
        movies: action.payload
        // loading: false
      };
    // case GET_PROFILE:
    //   return {
    //     ...state,
    //     profile: action.payload,
    //     loading: false
    //   };
    // case GET_PROFILES:
    //   return {
    //     ...state,
    //     profiles: action.payload,
    //     loading: false
    //   };
    // case CLEAR_CURRENT_PROFILE:
    //   return {
    //     ...state,
    //     profile: null
    //   };
    default:
      return state;
  }
}
