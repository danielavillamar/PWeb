import { combineReducers } from "redux";

import * as types from "../types/recommendations";
import omit from "lodash/omit";

const recommendations = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_RECOMMENDATIONS_STARTED:
      return null;
    case types.FETCH_RECOMMENDATIONS_COMPLETED:
      return { ...action.payload.recommendations };
    case types.FETCH_RECOMMENDATIONS_FAILED:
      return null;
    case types.FOLLOW_USER_COMPLETED:
      return omit(state, action.payload.userName);
    default:
      return state;
  }
};
const error = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_RECOMMENDATIONS_STARTED:
      return null;
    case types.FETCH_RECOMMENDATIONS_COMPLETED:
      return null;
    case types.FETCH_RECOMMENDATIONS_FAILED:
      return { ...action.payload.error };
    default:
      return state;
  }
};
const isLoading = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_RECOMMENDATIONS_STARTED:
      return true;
    case types.FETCH_RECOMMENDATIONS_COMPLETED:
      return false;
    case types.FETCH_RECOMMENDATIONS_FAILED:
      return false;
    default:
      return state;
  }
};

const followRecommendations = combineReducers({
  recommendations,
  error,
  isLoading,
});

export default followRecommendations;

export const getRecommendations = (state) => state.recommendations;
