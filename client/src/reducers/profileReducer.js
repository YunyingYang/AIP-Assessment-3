import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from '../actions/types';

// reducer for user profile
const initialState = {
  profile: null,
  profiles: null,
  loading: false,
    currentPage: null,
    totalPages: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
          loading: false,
          profiles: action.payload.userProfiles,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
