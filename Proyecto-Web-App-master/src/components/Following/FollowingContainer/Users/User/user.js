import React from "react";

import userLogo from "../../../../../img/userlogo.svg";
import * as actions from "../../../../../actions/followinfo";
import * as selectors from "../../../../../reducers";

import "./styles.css";
import { connect } from "react-redux";

const User = ({
  userInfo,
  unfollow,
  navigationStatus,
  followingList,
  follow,
}) => {
  if (navigationStatus === "Siguiendo") {
    return (
      <div className="display-user">
        <div className="user-pp">
          <img src={userLogo} alt="" />
        </div>
        <div className="user-name">
          <h3>{"@" + userInfo.user_name}</h3>
        </div>
        <div className="user-btn">
          <div
            className="unfollow"
            data-hover="Dejar de seguir"
            onClick={() => unfollow(userInfo.user_name)}
          >
            Siguiendo
          </div>
        </div>
      </div>
    );
  }

  if (navigationStatus === "Seguidores") {
    return (
      <div className="display-user">
        <div className="user-pp">
          <img src={userLogo} alt="" />
        </div>
        <div className="user-name">
          <h3>{"@" + userInfo.user_name}</h3>
        </div>
        <div className="user-btn">
          {userInfo.user_name in followingList ? (
            <div
              className="unfollow"
              data-hover="Dejar de seguir"
              onClick={() => unfollow(userInfo.user_name)}
            >
              Siguiendo
            </div>
          ) : (
            <div className="follow" onClick={() => follow(userInfo.user_name)}>
              Seguir
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default connect(
  (state) => ({
    followingList: selectors.getFollowingList(state),
    navigationStatus: selectors.getFollowNavigationWindow(state),
  }),
  (dispatch) => ({
    unfollow(userName) {
      dispatch(actions.unfollowUserStarted(userName));
    },
    follow(userName) {
      dispatch(actions.followUserStarted(userName));
    },
  })
)(User);
