import { fork, all } from "redux-saga/effects";

import { watchLoginStarted, watchRefreshTokenStarted } from "./auth";
import { watchCreateUserStarted } from "./createuser";
import { watchGetFeedTweets } from "./feedtweets";
import { watchTweetSomething } from "./tweetsomething";
import { watchRetweetSomething } from "./retweetsomething";
import { watchFavSomething } from "./favsomething";
import { watchSaveSomething } from "./savesomething";
import { watchGetMyTweets } from "./mytweets";
import {
  watchGetFollowingUsers,
  watchUnfollowUser,
  watchGetFollwerUsers,
  watchFollowUser,
} from "./followinfo";
import { watchGetRecommendations } from "./recommendations";

function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchRefreshTokenStarted),
    fork(watchCreateUserStarted),
    fork(watchGetFeedTweets),
    fork(watchTweetSomething),
    fork(watchRetweetSomething),
    fork(watchFavSomething),
    fork(watchSaveSomething),
    fork(watchGetMyTweets),
    fork(watchGetFollowingUsers),
    fork(watchUnfollowUser),
    fork(watchGetFollwerUsers),
    fork(watchFollowUser),
    fork(watchGetRecommendations),
  ]);
}

export default mainSaga;
