import * as types from "../constants/actionType";

export const loggIn = (user) => {
  return {
    type: types.LOG_IN,
    user: user,
  };
};
