import { combineReducers } from "redux";

import * as types from "../types/mytweets";

const tweets = (state = null, action) => {
  switch (action.type) {
    case types.FETCHING_MY_TWEETS_COMPLETED:
      return { ...action.payload };
    case types.AUTHENTICATION_IDENTITY_CLEARED:
      return null;
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.FETCHING_MY_TWEETS_STARTED:
      return null;
    case types.FETCHING_MY_TWEETS_COMPLETED:
      return null;
    case types.FETCHING_MY_TWEETS_FAILED:
      return { ...action.payload };
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case types.FETCHING_MY_TWEETS_STARTED:
      return true;
    case types.FETCHING_MY_TWEETS_COMPLETED:
      return false;
    case types.FETCHING_MY_TWEETS_FAILED:
      return false;
    default:
      return state;
  }
};

const myTweets = combineReducers({
  tweets,
  error,
  isLoading,
});

export default myTweets;

export const getMyTweets = (state) =>
  state.tweets ? state.tweets.myTweets : null;
export const getMyFavTweets = (state) =>
  state.tweets ? state.tweets.myFavTweets : null;
export const getMyRetweetedTweets = (state) =>
  state.tweets ? state.tweets.myRtwTweets : null;
export const getMySavedTweets = (state) =>
  state.tweets ? state.tweets.mySavedTweets : null;
export const getMyTweetsError = (state) => state.error;
export const getIsLoading = (state) => state.isLoading;
