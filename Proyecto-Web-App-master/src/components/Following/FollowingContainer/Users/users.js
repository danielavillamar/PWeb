import React from "react";
import { connect } from "react-redux";

import * as selectors from "../../../../reducers";
import User from "./User/user";

import "./styles.css";

const Users = ({ followingList, followersList, navigationStatus }) => {
  if (navigationStatus === "Siguiendo") {
    return (
      <div className="users-container">
        {followingList && Object.keys(followingList).length !== 0 ? (
          Object.values(followingList).map((user) => (
            <User key={user.user_name} userInfo={user} />
          ))
        ) : (
          <h3>Aun no sigues a alguien.</h3>
        )}
      </div>
    );
  }

  if (navigationStatus === "Seguidores") {
    return (
      <div className="users-container">
        {followersList && Object.keys(followersList).length !== 0 ? (
          Object.values(followersList).map((user) => (
            <User key={user.user_name} userInfo={user} />
          ))
        ) : (
          <h3>Aun no tienes seguidores.</h3>
        )}
      </div>
    );
  }
};

export default connect((state) => ({
  followingList: selectors.getFollowingList(state),
  followersList: selectors.getFollowersList(state),
  navigationStatus: selectors.getFollowNavigationWindow(state),
}))(Users);
