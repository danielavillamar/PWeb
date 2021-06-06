import * as types from "../types/recommendations";

export const fetchFollowRecommendations = () => ({
  type: types.FETCH_RECOMMENDATIONS_STARTED,
});
export const completeFetchFollowRecommendations = (recommendations) => ({
  type: types.FETCH_RECOMMENDATIONS_COMPLETED,
  payload: { recommendations },
});
export const failFetchFollowRecommendations = (error) => ({
  type: types.FETCH_RECOMMENDATIONS_FAILED,
  payload: { error },
});
