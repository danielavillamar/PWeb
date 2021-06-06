import { combineReducers } from "redux";

import * as types from "../types/navigation";

const navigationWindow = (state = "Tweets", action) => {
  switch (action.type) {
    case types.CHANGE_PROFILE_NAVIGATION:
      return action.payload.window;
    case types.AUTHENTICATION_IDENTITY_CLEARED:
      return "Tweets";
    case types.FETCHING_FEED_TWEETS_STARTED:
      return "Tweets";
    default:
      return state;
  }
};

const followNavigation = (state = "Siguiendo", action) => {
  switch (action.type) {
    case types.CHANGE_FOLLOW_NAVIGATION:
      return action.payload.window;
    case types.AUTHENTICATION_IDENTITY_CLEARED:
      return "Siguiendo";
    case types.FETCHING_FEED_TWEETS_STARTED:
      return "Siguiendo";
    default:
      return state;
  }
};

const navigation = combineReducers({
  navigationWindow,
  followNavigation,
});

export default navigation;

export const getNavigationWindow = (state) => state.navigationWindow;
export const followNavigationWindow = (state) => state.followNavigation;
