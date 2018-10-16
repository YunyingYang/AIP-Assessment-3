import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

// reducer for all errors
const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
        case CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
}
