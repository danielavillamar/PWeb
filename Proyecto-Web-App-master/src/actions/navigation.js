import * as types from "../types/navigation";

export const changeNavigationWindow = (window) => ({
  type: types.CHANGE_PROFILE_NAVIGATION,
  payload: { window },
});

export const changeFollowNavigation = (window) => ({
  type: types.CHANGE_FOLLOW_NAVIGATION,
  payload: { window },
});
