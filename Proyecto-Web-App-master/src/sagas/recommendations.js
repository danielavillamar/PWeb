import { call, takeEvery, put, select } from "redux-saga/effects";

import { API_BASE_URL } from "../settings";
import * as selectors from "../reducers";
import * as actions from "../actions/recommendations";
import * as types from "../types/recommendations";

function* getRecommendations(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/follower/get_follow_recomendations/`,
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
        yield put(actions.completeFetchFollowRecommendations(jsonResult));
      }
    } else {
    }
  } catch (error) {
    yield put(actions.failFetchFollowRecommendations(error));
  }
}

export function* watchGetRecommendations() {
  yield takeEvery(types.FETCH_RECOMMENDATIONS_STARTED, getRecommendations);
}
