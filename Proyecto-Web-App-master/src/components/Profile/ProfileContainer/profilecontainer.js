import React from "react";

import UserInfo from "./UserInfo/userinfo";
import Tweets from "../../Tweets/tweets";

import "./styles.css";

const ProfileContainer = () => {
  return (
    <div className="profile-main-container">
      <UserInfo />
      <Tweets />
    </div>
  );
};

export default ProfileContainer;
