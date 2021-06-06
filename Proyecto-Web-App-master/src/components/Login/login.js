import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import LoginForm from "./LoginForm/loginform";
import * as selectors from "../../reducers";

import "./styles.css";

const Login = ({ isAuthenticated }) => {
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
        <h1>Iniciar Sesion en Twitter</h1>
      </div>
      <LoginForm />
    </div>
  );
};

export default connect((state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
}))(Login);
