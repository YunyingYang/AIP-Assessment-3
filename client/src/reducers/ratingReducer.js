import {
    GET_RATING,
    GET_RATINGS,
    RATING_LOADING,
    CLEAR_CURRENT_RATING
} from '../actions/types';

const initialState = {
    rating: null,
    ratings: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RATING_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_RATING:
            return {
                ...state,
                rating: action.payload,
                loading: false
            };
        case GET_RATINGS:
            return {
                ...state,
                ratings: action.payload,
                loading: false
            };
        case CLEAR_CURRENT_RATING:
            return {
                ...state,
                rating: null
            };
        default:
            return state;
    }
}
