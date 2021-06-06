import React from "react";

import userLogo from "../../../img/userlogo.svg";
import * as actions from "../../../actions/followinfo";

import "./styles.css";
import { connect } from "react-redux";

const Suggestion = ({ userInfo, follow }) => {
  return (
    <div className="suggestionpage-s-container">
      <div className="img">
        <img src={userLogo} alt="" />
      </div>
      <div className="suggestion-user-name">
        <h3>{"@" + userInfo.user_name}</h3>
      </div>
      <div className="suggestion-btn-container">
        <div className="follow" onClick={() => follow(userInfo.user_name)}>
          Seguir
        </div>
      </div>
    </div>
  );
};

export default connect(undefined, (dispatch) => ({
  follow(userName) {
    dispatch(actions.followUserStarted(userName));
  },
}))(Suggestion);
