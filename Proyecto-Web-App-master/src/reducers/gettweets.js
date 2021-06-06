import { combineReducers } from "redux";
import omit from "lodash/omit";

import * as types from "../types/gettweets";

const feedTweets = (state = null, action) => {
  switch (action.type) {
    case types.FETCHING_TWEETS_COMPLETED:
      return { ...action.payload.tweets };
    case types.POST_TWEET_STARTED:
      const newState = { ...state };
      newState[action.payload.id] = { ...action.payload };
      return newState;
    case types.POST_TWEET_COMPLETED:
      const { prevId, tweet } = action.payload;
      const newS = omit(state, prevId);
      newS[tweet.id] = {
        ...tweet,
      };
      return newS;
    case types.RETWEET_COMPLETED:
      const prevState = { ...state };
      prevState[action.payload.tweetInfo.id] = { ...action.payload.tweetInfo };
      return prevState;
    case types.FAV_TWEET_COMPLETED:
      const prevS = { ...state };
      prevS[action.payload.tweetInfo.id] = { ...action.payload.tweetInfo };
      return prevS;
    case types.POST_TWEET_FAILED:
      return omit(state, action.payload.id);
    case types.AUTHENTICATION_IDENTITY_CLEARED:
      return null;
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.FETCHING_TWEETS_FAILED:
      return { ...action.payload };
    default:
      return state;
  }
};

const isLoading = (state = null, action) => {
  switch (action.type) {
    case types.FETCHING_FEED_TWEETS_STARTED:
      return true;
    case types.FETCHING_TWEETS_COMPLETED:
      return false;
    case types.FETCHING_TWEETS_FAILED:
      return false;
    default:
      return state;
  }
};

const getTweets = combineReducers({
  feedTweets,
  error,
  isLoading,
});

export default getTweets;

export const getFeedTweet = (state, tweetId) =>
  state ? state.feedTweets[tweetId] : undefined;
export const getFeedTweets = (state) => state.feedTweets;
export const getTweetsError = (state) => state.error;
export const getIsLoading = (state) => state.isLoading;
