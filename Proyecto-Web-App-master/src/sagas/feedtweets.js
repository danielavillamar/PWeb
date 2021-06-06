import { call, takeEvery, put, select } from "redux-saga/effects";

import { API_BASE_URL } from "../settings";
import * as selectors from "../reducers";
import * as actions from "../actions/gettweets";
import * as types from "../types/gettweets";

function* getFeedTweets(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/tweets/get_following_tweets`,
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
        yield put(actions.completeFetchingFeedTweets(jsonResult));
      }
    } else {
    }
  } catch (error) {
    yield put(actions.failFetchingTweets(error));
  }
}

export function* watchGetFeedTweets() {
  yield takeEvery(types.FETCHING_FEED_TWEETS_STARTED, getFeedTweets);
}
