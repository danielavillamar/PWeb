import { call, takeEvery, put, select } from "redux-saga/effects";

import { API_BASE_URL } from "../settings";
import * as selectors from "../reducers";
import * as actions from "../actions/savesomething";
import * as types from "../types/savesomething";

function* saveSomething(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const user_name = yield select(selectors.getAuthUsername);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const { tweetInfo } = action.payload;
      const saveInfo = {
        tweet_id: tweetInfo.id,
        user_name: user_name,
      };

      const response = yield call(fetch, `${API_BASE_URL}/saved-tweets/`, {
        method: "POST",
        body: JSON.stringify(saveInfo),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      });

      if (response.status === 200) {
        const jsonResult = yield response.json();
        yield put(actions.saveCompleted(jsonResult));
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.saveFail(non_field_errors[0], tweetInfo.id));
      }
    }
  } catch (error) {
    yield put(actions.saveFail(error));
  }
}

export function* watchSaveSomething() {
  yield takeEvery(types.SAVE_TWEET_STARTED, saveSomething);
}
