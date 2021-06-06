import { call, takeEvery, put, select } from "redux-saga/effects";

import { API_BASE_URL } from "../settings";
import * as selectors from "../reducers";
import * as actions from "../actions/tweetsomething";
import * as types from "../types/tweetsomething";

function* tweetSomething(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(fetch, `${API_BASE_URL}/tweets/`, {
        method: "POST",
        body: JSON.stringify(action.payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      });

      if (response.status === 201) {
        const jsonResult = yield response.json();
        yield put(actions.tweetingComplete(jsonResult, action.payload.id));
      } else {
        const { non_field_errors } = yield response.json();
        yield put(
          actions.failPostingTweet(non_field_errors[0], action.payload.id)
        );
      }
    }
  } catch (error) {
    yield put(actions.failPostingTweet(error, action.payload.id));
  }
}

export function* watchTweetSomething() {
  yield takeEvery(types.POST_TWEET_STARTED, tweetSomething);
}
