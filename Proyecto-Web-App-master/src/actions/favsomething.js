import * as types from "../types/favsomething";

export const startFavTweet = (tweetInfo) => ({
  type: types.FAV_TWEET_STARTED,
  payload: { tweetInfo },
});
export const favCompleted = (tweetInfo, prevId) => ({
  type: types.FAV_TWEET_COMPLETED,
  payload: { tweetInfo, prevId },
});
export const favFail = (error, prevId) => ({
  type: types.FAV_TWEET_FAILED,
  payload: { error, prevId },
});
