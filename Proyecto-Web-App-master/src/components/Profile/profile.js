import React from "react";
import { connect } from "react-redux";

import SideBar from "../SideBar/sidebar";
import ProfileContainer from "./ProfileContainer/profilecontainer";
import Suggestions from "../Suggestions/suggestions";

import "./styles.css";

const Profile = () => {
  return (
    <div className="main-profile-container">
      <SideBar />
      <ProfileContainer />
      <Suggestions />
    </div>
  );
};

export default connect()(Profile);
