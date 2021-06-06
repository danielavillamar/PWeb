import { combineReducers } from "redux";

import * as types from "../types/tweetsomething";

const postSomething = (state = null, action) => {
  switch (action.type) {
    case types.POST_TWEET_STARTED:
      return { ...action.payload };
    case types.POST_TWEET_COMPLETED:
      return null;
    case types.POST_TWEET_FAILED:
      return null;
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.POST_TWEET_STARTED:
      return null;
    case types.POST_TWEET_COMPLETED:
      return null;
    case types.POST_TWEET_FAILED:
      return { ...action.payload.error };
    default:
      return state;
  }
};

const isLoading = (state = null, action) => {
  switch (action.type) {
    case types.POST_TWEET_STARTED:
      return true;
    case types.POST_TWEET_COMPLETED:
      return false;
    case types.POST_TWEET_FAILED:
      return false;
    default:
      return state;
  }
};

const tweetSomething = combineReducers({
  postSomething,
  error,
  isLoading,
});

export default tweetSomething;

export const getTweetError = (state) => state.error;
export const getIsLoadingTweet = (state) => state.isLoading;
