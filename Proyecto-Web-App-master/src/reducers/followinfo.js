import { combineReducers } from "redux";
import omit from "lodash/omit";
import * as types from "../types/followinfo";

const followingList = (state = null, action) => {
  switch (action.type) {
    case types.FETCHING_FOLLOWING_USERS_STARTED:
      return state;
    case types.FETCHING_FOLLOWING_USERS_COMPLETED:
      return { ...action.payload.followList };
    case types.FETCHING_FOLLOWING_USERS_FAILED:
      return null;
    case types.FOLLOW_USER_COMPLETED:
      let newState = { ...state };
      newState[action.payload.userName] = {
        user_name: action.payload.userName,
      };
      return newState;
    case types.AUTHENTICATION_IDENTITY_CLEARED:
      return null;
    case types.UNFOLLOW_USER_COMPLETED:
      return omit(state, action.payload.userName);
    default:
      return state;
  }
};

const followersList = (state = null, action) => {
  switch (action.type) {
    case types.FETCHING_FOLLOWER_USERS_STARTED:
      return state;
    case types.FETCHING_FOLLOWER_USERS_COMPLETED:
      return { ...action.payload.followList };
    case types.FETCHING_FOLLOWER_USERS_FAILED:
      return null;
    case types.AUTHENTICATION_IDENTITY_CLEARED:
      return null;
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.FETCHING_FOLLOWING_USERS_STARTED:
      return null;
    case types.FETCHING_FOLLOWER_USERS_STARTED:
      return null;
    case types.FETCHING_FOLLOWING_USERS_COMPLETED:
      return null;
    case types.FETCHING_FOLLOWER_USERS_COMPLETED:
      return null;
    case types.FETCHING_FOLLOWING_USERS_FAILED:
      return { ...action.payload.error };
    case types.FETCHING_FOLLOWER_USERS_FAILED:
      return { ...action.payload.error };
    case types.AUTHENTICATION_IDENTITY_CLEARED:
      return null;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case types.FETCHING_FOLLOWING_USERS_STARTED:
      return true;
    case types.FETCHING_FOLLOWER_USERS_STARTED:
      return true;
    case types.FETCHING_FOLLOWING_USERS_COMPLETED:
      return false;
    case types.FETCHING_FOLLOWER_USERS_COMPLETED:
      return false;
    case types.FETCHING_FOLLOWING_USERS_FAILED:
      return false;
    case types.FETCHING_FOLLOWER_USERS_FAILED:
      return false;
    case types.AUTHENTICATION_IDENTITY_CLEARED:
      return false;
    default:
      return state;
  }
};

const followInfo = combineReducers({
  followingList,
  followersList,
  error,
  isLoading,
});

export default followInfo;

export const getFollowingList = (state) =>
  state.followingList ? state.followingList : null;
export const getFollowersList = (state) =>
  state.followersList ? state.followersList : null;
