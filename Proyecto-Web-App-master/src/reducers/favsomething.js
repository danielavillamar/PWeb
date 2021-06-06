import { combineReducers } from "redux";

import * as types from "../types/favsomething";

const favSomething = (state = null, action) => {
  switch (action.type) {
    case types.FAV_TWEET_STARTED:
      return { ...action.payload.tweetInfo };
    case types.FAV_TWEET_COMPLETED:
      return null;
    case types.FAV_TWEET_FAILED:
      return null;
    default:
      return state;
  }
};
const error = (state = null, action) => {
  switch (action.type) {
    case types.FAV_TWEET_STARTED:
      return null;
    case types.FAV_TWEET_COMPLETED:
      return null;
    case types.FAV_TWEET_FAILED:
      return { ...action.payload.error };
    default:
      return state;
  }
};
const isLoading = (state = null, action) => {
  switch (action.type) {
    case types.FAV_TWEET_STARTED:
      return true;
    case types.FAV_TWEET_COMPLETED:
      return false;
    case types.FAV_TWEET_FAILED:
      return false;
    default:
      return state;
  }
};

const favourite = combineReducers({
  favSomething,
  error,
  isLoading,
});

export default favourite;

export const getFavError = (state) => state.error;
export const getIsLoadingFav = (state) => state.isLoading;
