import { call, takeEvery, put, select } from "redux-saga/effects";

import { API_BASE_URL } from "../settings";
import * as selectors from "../reducers";
import * as actions from "../actions/followinfo";
import * as types from "../types/followinfo";

function* getFollowingUsers(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/follower/get_following_list/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const jsonResult = yield response.json();
        yield put(actions.completeFetchingFollowingUsers(jsonResult));
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFetchingFollowingUsers(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failFetchingFollowingUsers(error));
  }
}

export function* watchGetFollowingUsers() {
  yield takeEvery(types.FETCHING_FOLLOWING_USERS_STARTED, getFollowingUsers);
}

function* unfollowUser(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const { userName } = action.payload;
      const response = yield call(
        fetch,
        `${API_BASE_URL}/follower/${userName}/unfollow/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );

      if (response.status === 200) {
        yield put(actions.unfollowUserCompleted(userName));
      } else {
      }
    }
  } catch (error) {
    yield put(actions.failFetchingFollowingUsers(error));
  }
}

export function* watchUnfollowUser() {
  yield takeEvery(types.UNFOLLOW_USER_STARTED, unfollowUser);
}

function* getFollowerUsers(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/follower/get_followers_list/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const jsonResult = yield response.json();
        yield put(actions.completeFetchingFollowerUsers(jsonResult));
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFetchingFollowerUsers(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failFetchingFollowerUsers(error));
  }
}

export function* watchGetFollwerUsers() {
  yield takeEvery(types.FETCHING_FOLLOWER_USERS_STARTED, getFollowerUsers);
}

function* followUser(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const { userName } = action.payload;
      const response = yield call(
        fetch,
        `${API_BASE_URL}/follower/${userName}/follow/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );

      if (response.status === 200) {
        yield put(actions.followUserCompleted(userName));
      } else {
      }
    }
  } catch (error) {
    yield put(actions.failFetchingFollowingUsers(error));
  }
}

export function* watchFollowUser() {
  yield takeEvery(types.FOLLOW_USER_STARTED, followUser);
}
