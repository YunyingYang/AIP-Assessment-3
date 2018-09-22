import {
  MOVIE_LOADING,
  POST_SEARCHRESULT,
  GET_CURRENTMV,
  GET_CURRENTMVTMDB
} from "../actions/types";

const initialState = {
  movie: null,
  movieTmdb: null,
  movies: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MOVIE_LOADING:
      return {
        ...state,
        loading: true
      };
    case POST_SEARCHRESULT:
      return {
        ...state,
        movies: action.payload
        // loading: false
      };
    case GET_CURRENTMV:
      return {
        ...state,
        movie: action.payload
      };
    case GET_CURRENTMVTMDB:
      return {
        ...state,
        movieTmdb: action.payload
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
