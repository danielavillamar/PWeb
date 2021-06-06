import * as types from "../types/createuser";

export const createUser = (user_name, email, password, name) => ({
  type: types.CREATE_USER_STARTED,
  payload: { user_name, email, password, name },
});

export const completeCreateUser = () => ({
  type: types.CREATE_USER_COMPLETED,
});

export const failCreateUser = (error) => ({
  type: types.CREATE_USER_FAILED,
  payload: { error },
});
