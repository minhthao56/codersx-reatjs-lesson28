import { combineReducers } from "redux";
import logIn from "./logIn";

const myReducer = combineReducers({
  logIn: logIn,
});

export default myReducer;
