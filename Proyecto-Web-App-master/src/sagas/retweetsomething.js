import { call, takeEvery, put, select } from "redux-saga/effects";

import { API_BASE_URL } from "../settings";
import * as selectors from "../reducers";
import * as actions from "../actions/retweetsomething";
import * as types from "../types/retweetsomething";

function* retweetSomething(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    const user_name = yield select(selectors.getAuthUsername);
    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const { tweetInfo } = action.payload;
      tweetInfo.retweets += 1;
      const response = yield call(
        fetch,
        `${API_BASE_URL}/tweets/${tweetInfo.id}/`,
        {
          method: "PATCH",
          body: JSON.stringify(tweetInfo),
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const jsonResult = yield response.json();
        yield put(actions.retweetCompleted(jsonResult));
        const retweetInfo = {
          tweet_id: jsonResult.id,
          user_name: user_name,
        };
        yield call(fetch, `${API_BASE_URL}/retweets/`, {
          method: "POST",
          body: JSON.stringify(retweetInfo),
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        });
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.retweetFail(non_field_errors[0], tweetInfo.id));
      }
    }
  } catch (error) {
    yield put(actions.retweetFail(error));
  }
}

export function* watchRetweetSomething() {
  yield takeEvery(types.RETWEET_STARTED, retweetSomething);
}
