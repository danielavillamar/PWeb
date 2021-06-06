import { combineReducers } from "redux";

import * as types from "../types/retweetsomething";

const retweetSomething = (state = null, action) => {
  switch (action.type) {
    case types.RETWEET_STARTED:
      return { ...action.payload.tweetInfo };
    case types.RETWEET_COMPLETED:
      return null;
    case types.RETWEET_FAILED:
      return null;
    default:
      return state;
  }
};
const error = (state = null, action) => {
  switch (action.type) {
    case types.RETWEET_STARTED:
      return null;
    case types.RETWEET_COMPLETED:
      return null;
    case types.RETWEET_FAILED:
      return { ...action.payload.error };
    default:
      return state;
  }
};
const isLoading = (state = null, action) => {
  switch (action.type) {
    case types.RETWEET_STARTED:
      return true;
    case types.RETWEET_COMPLETED:
      return false;
    case types.RETWEET_FAILED:
      return false;
    default:
      return state;
  }
};

const retweet = combineReducers({
  retweetSomething,
  error,
  isLoading,
});

export default retweet;

export const getRetweetError = (state) => state.error;
export const getIsLoadingRetweet = (state) => state.isLoading;
