import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import searchReducer from "./searchReducer";

// list of all reducers
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  search: searchReducer
});
