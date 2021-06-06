import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./styles.css";
import * as authActions from "../../actions/auth";
import * as getTweetsActions from "../../actions/gettweets";
import * as getMyTweetsActions from "../../actions/mytweets";
import * as followInfoActions from "../../actions/followinfo";
import * as selectors from "../../reducers";
import { Link } from "react-router-dom";

const SideBar = ({ onClick, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img
          src="https://pngimg.com/uploads/twitter/twitter_PNG15.png"
          alt=""
        />
      </div>
      <div className="feed-options-container">
        <ul>
          <Link to="feed">
            <div
              className="sidebar-option"
              onClick={() => {
                onClick("feed");
              }}
            >
              <FontAwesomeIcon icon={faHome} />
              <li>Inicio</li>
            </div>
          </Link>
          <Link to="profile">
            <div
              className="sidebar-option"
              onClick={() => {
                onClick("profile");
              }}
            >
              <FontAwesomeIcon icon={faUser} />
              <li>Perfil</li>
            </div>
          </Link>
          <div
            className="sidebar-option"
            onClick={() => {
              onClick("logout");
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <li>Logout</li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    isAuthenticated: selectors.isAuthenticated(state),
  }),
  (dispatch) => ({
    onClick(path) {
      switch (path) {
        case "feed":
          dispatch(getTweetsActions.getFeedTweets());
          break;
        case "profile":
          //TODO CARGAR PROFILE
          dispatch(getMyTweetsActions.fetchingMyTweets());
          dispatch(followInfoActions.fetchingFollowingUsers());
          dispatch(followInfoActions.fetchingFollowerUsers());
          break;
        case "logout":
          //TODO DISPATCH LOGOUT
          dispatch(authActions.logout());
          break;
        default:
          return null;
      }
    },
  })
)(SideBar);
