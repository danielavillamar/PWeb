import React from "react";

import SideBar from "../SideBar/sidebar";
import FollowContainer from "./FollowingContainer/followingcontainer";
import Suggestions from "../Suggestions/suggestions";

import "./styles.css";

const Following = () => {
  return (
    <div className="main-following-container">
      <SideBar />
      <FollowContainer />
      <Suggestions />
    </div>
  );
};

export default Following;
