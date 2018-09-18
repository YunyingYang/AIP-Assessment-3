import axios from 'axios';
import { GET_ERRORS } from './types';

export const registerUser = userData => dispatch => {
    // return {
    //     type: TEST_DISPATCH,
    //     payload: userData
    // }
    axios.post('/api/users/register', userData)
        .then(res => console.log(res.data))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};