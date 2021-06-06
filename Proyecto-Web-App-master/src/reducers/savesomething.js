import { combineReducers } from "redux";

import * as types from "../types/savesomething";

const saveSomething = (state = null, action) => {
  switch (action.type) {
    case types.SAVE_TWEET_STARTED:
      return { ...action.payload.tweetInfo };
    case types.SAVE_TWEET_COMPLETED:
      return null;
    case types.SAVE_TWEET_FAILED:
      return null;
    default:
      return state;
  }
};
const error = (state = null, action) => {
  switch (action.type) {
    case types.SAVE_TWEET_STARTED:
      return null;
    case types.SAVE_TWEET_COMPLETED:
      return null;
    case types.SAVE_TWEET_FAILED:
      return { ...action.payload.error };
    default:
      return state;
  }
};
const isLoading = (state = null, action) => {
  switch (action.type) {
    case types.SAVE_TWEET_STARTED:
      return true;
    case types.SAVE_TWEET_COMPLETED:
      return false;
    case types.SAVE_TWEET_FAILED:
      return false;
    default:
      return state;
  }
};

const save = combineReducers({
  saveSomething,
  error,
  isLoading,
});

export default save;

export const getFavError = (state) => state.error;
export const getIsLoadingFav = (state) => state.isLoading;
