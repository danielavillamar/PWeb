import { call, takeEvery, put, select } from "redux-saga/effects";

import { API_BASE_URL } from "../settings";
import * as selectors from "../reducers";
import * as actions from "../actions/mytweets";
import * as types from "../types/mytweets";

function* getMyTweets(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const myTweetsResponse = yield call(
        fetch,
        `${API_BASE_URL}/tweets/my_tweets/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );

      const myFavTweetsResponse = yield call(
        fetch,
        `${API_BASE_URL}/favourites/my_fav_tweets/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );

      const myRtwTweetsResponse = yield call(
        fetch,
        `${API_BASE_URL}/retweets/my_rtw_tweets/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );

      const mySavedTweetsResponse = yield call(
        fetch,
        `${API_BASE_URL}/saved-tweets/my_saved_tweets/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      );

      if (
        myTweetsResponse.status === 200 &&
        myFavTweetsResponse.status === 200 &&
        myRtwTweetsResponse.status === 200 &&
        mySavedTweetsResponse.status === 200
      ) {
        const myTweetsJsonResult = yield myTweetsResponse.json();
        const myFavTweetsJsonResult = yield myFavTweetsResponse.json();
        const myRtwTweetsJsonResult = yield myRtwTweetsResponse.json();
        const mySavedTweetsJsonResult = yield mySavedTweetsResponse.json();

        yield put(
          actions.completedFetchingMyTweets({
            myTweets: myTweetsJsonResult,
            myFavTweets: myFavTweetsJsonResult,
            myRtwTweets: myRtwTweetsJsonResult,
            mySavedTweets: mySavedTweetsJsonResult,
          })
        );
      }
    } else {
    }
  } catch (error) {
    yield put(actions.failFetchingMyTweets(error));
  }
}

export function* watchGetMyTweets() {
  yield takeEvery(types.FETCHING_MY_TWEETS_STARTED, getMyTweets);
}
