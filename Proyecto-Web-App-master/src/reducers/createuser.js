import { combineReducers } from "redux";

import * as types from "../types/createuser";

const user = (state = null, action) => {
  switch (action.type) {
    case types.CREATE_USER_STARTED:
      return { ...action.payload };
    case types.CREATE_USER_FAILED:
      return null;
    case types.CREATE_USER_COMPLETED:
      return null;
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.CREATE_USER_STARTED:
      return null;
    case types.CREATE_USER_FAILED:
      return action.payload.error;
    case types.CREATE_USER_COMPLETED:
      return null;
    default:
      return state;
  }
};

const isLoading = (state = null, action) => {
  switch (action.type) {
    case types.CREATE_USER_STARTED:
      return true;
    case types.CREATE_USER_FAILED:
      return false;
    case types.CREATE_USER_COMPLETED:
      return false;
    default:
      return state;
  }
};

const createUser = combineReducers({
  user,
  error,
  isLoading,
});

export default createUser;

export const getErrorMsg = (state) => state.error;
export const getIsLoading = (state) => state.isLoading;
