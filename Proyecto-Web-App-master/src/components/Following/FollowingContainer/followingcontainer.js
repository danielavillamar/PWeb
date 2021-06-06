import React from "react";

import Users from "./Users/users";
import FollowNavigation from "./FollowNavigation/follownavigation";

import "./styles.css";

const FollowContainer = () => {
  return (
    <div className="following-main-container">
      <FollowNavigation />
      <Users />
    </div>
  );
};

export default FollowContainer;
