import * as types from "../types/followinfo";

export const fetchingFollowingUsers = () => ({
  type: types.FETCHING_FOLLOWING_USERS_STARTED,
});

export const completeFetchingFollowingUsers = (followList) => ({
  type: types.FETCHING_FOLLOWING_USERS_COMPLETED,
  payload: { followList },
});

export const failFetchingFollowingUsers = (error) => ({
  type: types.FETCHING_FOLLOWING_USERS_FAILED,
  payload: { error },
});

export const fetchingFollowerUsers = () => ({
  type: types.FETCHING_FOLLOWER_USERS_STARTED,
});

export const completeFetchingFollowerUsers = (followList) => ({
  type: types.FETCHING_FOLLOWER_USERS_COMPLETED,
  payload: { followList },
});

export const failFetchingFollowerUsers = (error) => ({
  type: types.FETCHING_FOLLOWER_USERS_FAILED,
  payload: { error },
});

export const unfollowUserStarted = (userName) => ({
  type: types.UNFOLLOW_USER_STARTED,
  payload: { userName },
});

export const unfollowUserCompleted = (userName) => ({
  type: types.UNFOLLOW_USER_COMPLETED,
  payload: { userName },
});

export const unfollowUserFailed = (error) => ({
  type: types.UNFOLLOW_USER_FAILED,
  payload: { error },
});

export const followUserStarted = (userName) => ({
  type: types.FOLLOW_USER_STARTED,
  payload: { userName },
});

export const followUserCompleted = (userName) => ({
  type: types.FOLLOW_USER_COMPLETED,
  payload: { userName },
});

export const followUserFailed = (error) => ({
  type: types.FOLLOW_USER_FAILED,
  payload: { error },
});
