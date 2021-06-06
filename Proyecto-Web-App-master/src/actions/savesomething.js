import * as types from "../types/savesomething";

export const startSaveTweet = (tweetInfo) => ({
  type: types.SAVE_TWEET_STARTED,
  payload: { tweetInfo },
});
export const saveCompleted = (tweetInfo, prevId) => ({
  type: types.SAVE_TWEET_COMPLETED,
  payload: { tweetInfo, prevId },
});
export const saveFail = (error, prevId) => ({
  type: types.SAVE_TWEET_FAILED,
  payload: { error, prevId },
});
