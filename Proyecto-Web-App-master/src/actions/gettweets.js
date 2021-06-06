import * as types from "../types/gettweets";

export const getFeedTweets = () => ({
  type: types.FETCHING_FEED_TWEETS_STARTED,
});

export const completeFetchingFeedTweets = (tweets) => ({
  type: types.FETCHING_TWEETS_COMPLETED,
  payload: { tweets },
});

export const failFetchingTweets = (error) => ({
  type: types.FETCHING_TWEETS_FAILED,
  payload: { error },
});

export const startPosting = ({ user_id, id, tweeted_date, tweet }) => ({
  type: types.POST_TWEET_STARTED,
  payload: { user_id, id, tweeted_date, tweet },
});

export const tweetingComplete = (tweet, prevId) => ({
  type: types.POST_TWEET_COMPLETED,
  payload: { tweet, prevId },
});

export const failPostingTweet = (error, id) => ({
  type: types.POST_TWEET_FAILED,
  payload: { error, id },
});
