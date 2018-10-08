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
  loading: false,
  currentPage: null,
  totalPages: null
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
        movies: action.payload.movies,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages
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
    default:
      return state;
  }
}
