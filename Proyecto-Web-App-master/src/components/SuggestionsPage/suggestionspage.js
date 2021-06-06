import React from "react";

import SideBar from "../SideBar/sidebar";
import Suggestion from "./Suggestion/suggestion";
import Suggestions from "../Suggestions/suggestions";

import * as selectors from "../../reducers";

import "./styles.css";
import { connect } from "react-redux";

const SuggestionsPage = ({ suggestionsList }) => {
  return (
    <div className="main-suggestions-container">
      <SideBar />
      <div className="suggestionspage-container">
        <div className="suggestionspage-title">
          <h2>Sugerencias</h2>
        </div>
        {suggestionsList ? (
          Object.values(suggestionsList).map((suggestion) => (
            <Suggestion userInfo={suggestion} />
          ))
        ) : (
          <div>No tienes recomendaciones.</div>
        )}
      </div>
      <Suggestions />
    </div>
  );
};

export default connect((state) => ({
  suggestionsList: selectors.getFollowRecommendations(state),
}))(SuggestionsPage);
