import * as types from "../types/retweetsomething";

export const startRetweet = (tweetInfo) => ({
  type: types.RETWEET_STARTED,
  payload: { tweetInfo },
});
export const retweetCompleted = (tweetInfo, prevId) => ({
  type: types.RETWEET_COMPLETED,
  payload: { tweetInfo, prevId },
});
export const retweetFail = (error, prevId) => ({
  type: types.RETWEET_FAILED,
  payload: { error, prevId },
});
