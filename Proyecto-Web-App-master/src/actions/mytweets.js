import * as types from "../types/mytweets";

export const fetchingMyTweets = () => ({
  type: types.FETCHING_MY_TWEETS_STARTED,
});

export const completedFetchingMyTweets = ({
  myTweets,
  myRtwTweets,
  myFavTweets,
  mySavedTweets,
}) => ({
  type: types.FETCHING_MY_TWEETS_COMPLETED,
  payload: { myTweets, myFavTweets, myRtwTweets, mySavedTweets },
});

export const failFetchingMyTweets = (error) => ({
  type: types.FETCHING_MY_TWEETS_FAILED,
  payload: { error },
});
