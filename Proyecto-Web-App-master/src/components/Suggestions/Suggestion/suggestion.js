import React from "react";

import userlogo from "../../../img/userlogo.svg";
import * as actions from "../../../actions/followinfo";

import "./styles.css";
import { connect } from "react-redux";

const Suggestion = ({ userInfo, follow }) => {
  return (
    <div className="suggestion-container">
      <img src={userlogo} alt="" />
      {"@" + userInfo.user_name}
      <button
        className="suggestions-follow-btn"
        onClick={() => follow(userInfo.user_name)}
      >
        +
      </button>
    </div>
  );
};

export default connect(undefined, (dispatch) => ({
  follow(userName) {
    dispatch(actions.followUserStarted(userName));
  },
}))(Suggestion);
