import { call, takeEvery, put } from "redux-saga/effects";

import { API_BASE_URL } from "../settings";
import * as actions from "../actions/createuser";
import * as actions2 from "../actions/auth";
import * as types from "../types/createuser";

function* createUser(action) {
  const { user_name, password } = action.payload;
  try {
    const response = yield call(fetch, `${API_BASE_URL}/users/`, {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      yield put(actions.completeCreateUser());
      yield put(actions2.startLogin(user_name, password));
    } else {
      const { non_field_errors } = yield response.json();
      yield put(actions.failCreateUser(non_field_errors[0]));
    }
  } catch (error) {
    yield put(actions.failCreateUser(error));
  }
}

export function* watchCreateUserStarted() {
  yield takeEvery(types.CREATE_USER_STARTED, createUser);
}
