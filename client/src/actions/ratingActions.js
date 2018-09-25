import axios from 'axios';

import {
    GET_RATING,
    GET_RATINGS,
    RATING_LOADING,
    CLEAR_CURRENT_RATING,
    GET_ERRORS,
    SET_CURRENT_USER
} from './types';

// Get current rating
export const getRating = () => dispatch => {
    dispatch(setRatingLoading());
    axios
        .get('/api/usermovieratings')
        .then(res =>
            dispatch({
                type: GET_RATING,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_RATING,
                payload: {}
            })
        );
};

// Create Rating
export const createRating = (userRatingData, history) => dispatch => {
    axios
        .post('/api/usermovieratings', userRatingData)
        .then(res => console.log(res))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Get all ratings
export const getRatings = () => dispatch => {
    dispatch(setRatingLoading());
    axios
        .get('/api/usermovieratings/all')
        .then(res =>
            dispatch({
                type: GET_RATINGS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_RATINGS,
                payload: null
            })
        );
};

// Rating loading
export const setRatingLoading = () => {
    return {
        type: RATING_LOADING
    };
};

// Clear rating
export const clearCurrentRating = () => {
    return {
        type: CLEAR_CURRENT_RATING
    };
};
