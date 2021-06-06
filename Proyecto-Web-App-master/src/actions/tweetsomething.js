import * as types from "../types/tweetsomething";

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
