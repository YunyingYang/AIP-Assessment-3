import axios from "axios";

import {
  // GET_ERRORS,
  MOVIE_LOADING,
  POST_SEARCHRESULT,
  GET_CURRENTMV,
  GET_CURRENTMVTMDB
} from "./types";

// Get Post
// export const getMovies = (searchContent, history) => dispatch => {
//   dispatch(setMovieLoading());
//   axios
//     .post("/api/movies/search", searchContent)
//     .then(res => {
//       dispatch({
//         type: POST_SEARCHRESULT,
//         payload: res.data
//       });
//       // console.log(res.data);
//       history.push("/mvsearchresult");
//     })
//     .catch(err => console.log("cannot search"));
// };

export const getMovies = searchContent => dispatch => {
  dispatch(setMovieLoading());
  const keywords = searchContent;
  axios
    .post(`/api/movies/search/${keywords}`)
    .then(res => {
      dispatch({
        type: POST_SEARCHRESULT,
        payload: res.data
      });
      console.log("get movies by searching keywords");
      // history.push(`/api/movies/search/${searchContent}`);
    })
    .catch(err => console.log("cannot search"));
};

// Get profile by movie._id
export const getMovieByMvId = mvId => dispatch => {
  dispatch(setMovieLoading());
  axios
    .get(`/api/movies/mvdetails/${mvId}`)
    .then(res => {
      dispatch({
        type: GET_CURRENTMV,
        payload: res.data
      });
      console.log("save movie state by get api/movies/mvdetails/:movie_id");
    })
    .catch(err =>
      console.log(
        "cannot save movie state by get api/movies/mvdetails/:movie_id"
      )
    );
};

// Get movie from our api, and then save in "movie" state.
export const getMovieItem = (movie, history) => dispatch => {
  dispatch(setMovieLoading());
  axios
    .get(`/api/movies/mvdetails/${movie._id}`)
    .then(res => {
      dispatch({
        type: GET_CURRENTMV,
        payload: res.data
      });
      history.push(`/api/movies/mvdetails/${movie._id}`);
    })
    .catch(err =>
      console.log("cannot save movie state by get /mvdetails/:movie_id")
    );
};

// getMovieItemTmdb will control the page redirection.
export const getMovieItemTmdb = movie => dispatch => {
  dispatch(setMovieLoading());
  const url = URL(
    "https://api.themoviedb.org/3/movie/" +
      movie.tmdbId +
      "?api_key=9ff347d908a575c777ebecebe3fdcf6b&language=en-US"
  );
  const authheader = axios.defaults.headers.common["Authorization"] || null;
  delete axios.defaults.headers.common["Authorization"];
  axios
    .get(url)
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: GET_CURRENTMVTMDB,
        payload: res.data
      });
      axios.defaults.headers.common["Authorization"] = authheader;
    })
    .catch(err => {
      console.log("cannot find from tmdb");
      axios.defaults.headers.common["Authorization"] = authheader;
    });

  // axios.defaults.headers.common["Authorization"] = authheader;
};

// Save single tmdb movieItem info
export const saveSingleTmdb = movieTmdb => dispatch => {
  dispatch({
    type: GET_CURRENTMVTMDB,
    payload: movieTmdb
  });
};

// Movie loading
export const setMovieLoading = () => {
  return {
    type: MOVIE_LOADING
  };
};
