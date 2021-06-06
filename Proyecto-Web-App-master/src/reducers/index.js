import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth, * as authSelectors from "./auth";
import createUser, * as createUserSelectors from "./createuser";
import getTweets, * as getTweetsSelectors from "./gettweets";
import tweetsomething from "./tweetsomething";
import retweet from "./retweetsomething";
import favourite from "./favsomething";
import save from "./savesomething";
import navigation, * as navigationSelectors from "./navigation";
import myTweets, * as myTweetsSelectors from "./mytweets";
import followInfo, * as followInfoSelectors from "./followinfo";
import followRecommendations, * as recommendationsSelectors from "./recommendations";

const reducer = combineReducers({
  auth,
  createUser,
  getTweets,
  tweetsomething,
  retweet,
  favourite,
  save,
  navigation,
  myTweets,
  followInfo,
  followRecommendations,
  form: formReducer,
});

export default reducer;

// Auth Selectors
export const getAuthToken = (state) => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = (state) =>
  authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = (state) =>
  authSelectors.getAuthenticatingError(state.auth);
export const isAuthenticated = (state) => getAuthToken(state) != null;
export const getAuthUserID = (state) => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = (state) =>
  authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = (state) =>
  authSelectors.getAuthUsername(state.auth);
export const getIsRefreshingToken = (state) =>
  authSelectors.getIsRefreshingToken(state.auth);
export const getRefreshingError = (state) =>
  authSelectors.getRefreshingError(state.auth);

// Create User Selectors
export const getCreatingUserErrorMsg = (state) =>
  createUserSelectors.getErrorMsg(state.createUser);
export const getIsCreatingUser = (state) =>
  createUserSelectors.getIsLoading(state.createUser);

// Get Tweets Selectors
export const getFeedTweet = (state, tweetId) =>
  getTweetsSelectors.getFeedTweet(state.getTweets, tweetId);
export const getFeedTweets = (state) =>
  getTweetsSelectors.getFeedTweets(state.getTweets);
export const getTweetsError = (state) =>
  getTweetsSelectors.getTweetsError(state.getTweets);
export const getIsLoaidingTweets = (state) =>
  getTweetsSelectors.getIsLoading(state.getTweets);

// Navigation Selectors
export const getNavigationWindow = (state) =>
  navigationSelectors.getNavigationWindow(state.navigation);

export const getFollowNavigationWindow = (state) =>
  navigationSelectors.followNavigationWindow(state.navigation);

// My Tweets Selectors
export const getMyTweets = (state) =>
  myTweetsSelectors.getMyTweets(state.myTweets);
export const getMyFavTweets = (state) =>
  myTweetsSelectors.getMyFavTweets(state.myTweets);
export const getMySavedTweets = (state) =>
  myTweetsSelectors.getMySavedTweets(state.myTweets);
export const getMyRetweetedTweets = (state) =>
  myTweetsSelectors.getMyRetweetedTweets(state.myTweets);

//Followers and Following Selectors
export const getFollowingList = (state) =>
  followInfoSelectors.getFollowingList(state.followInfo);
export const getFollowersList = (state) =>
  followInfoSelectors.getFollowersList(state.followInfo);

export const getFollowRecommendations = (state) =>
  recommendationsSelectors.getRecommendations(state.followRecommendations);
