import React from "react";
import { connect } from "react-redux";

import Suggestion from "./Suggestion/suggestion";
import * as selectors from "../../reducers";
import * as actions from "../../actions/recommendations";

import "./styles.css";
import { Link } from "react-router-dom";

const Suggestions = ({ suggestionList, onClick }) => {
  let sidebarSuggestions = undefined;
  if (suggestionList) {
    sidebarSuggestions = Object.values(suggestionList).slice(0, 2);
  }
  return (
    <div className="suggestions-container">
      <div className="suggestions">
        <div className="suggestions-title">
          <h4>A quién seguir</h4>
        </div>
        {sidebarSuggestions
          ? sidebarSuggestions.map((userInfo) => {
              return (
                <Suggestion key={userInfo.user_name} userInfo={userInfo} />
              );
            })
          : null}
        <div>
          <Link to="/suggestions" onClick={onClick}>
            <h5>Mostrar mas</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    suggestionList: selectors.getFollowRecommendations(state),
  }),
  (dispatch) => ({
    onClick() {
      dispatch(actions.fetchFollowRecommendations());
    },
  })
)(Suggestions);
