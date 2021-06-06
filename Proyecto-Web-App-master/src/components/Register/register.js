import React from "react";

import RegisterForm from "./RegisterForm/registerform";
import { connect } from "react-redux";

import * as selectors from "../../reducers";
import { Redirect } from "react-router-dom";

const Register = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/feed" />;
  }
  return (
    <div className="main-login-container">
      <div className="login-logo">
        <img
          src="https://pngimg.com/uploads/twitter/twitter_PNG15.png"
          alt=""
        />
        <h1>Crea Tu Usuario en Twitter</h1>
      </div>
      <RegisterForm />
    </div>
  );
};

export default connect((state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
}))(Register);
