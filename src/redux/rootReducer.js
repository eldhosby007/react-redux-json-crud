import { combineReducers } from "redux";
import usersReduser from "./reducers";

const rootReducer = combineReducers({
  data: usersReduser,
});

export default rootReducer;
