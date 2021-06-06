import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import * as selectors from "../../../reducers";
import * as actions from "../../../actions/auth";

import "./styles.css";

const renderInput = ({ input, meta, label }) => (
  <div
    className={
      meta.active
        ? "input-div one focus"
        : meta.errors && meta.touched
        ? "input-div one form-error"
        : meta.dirty
        ? "input-div one focus"
        : "input-div one"
    }
  >
    <div className="i">
      <FontAwesomeIcon icon={label === "Usuario" ? faUser : faLock} />
    </div>
    <div>
      <h5>{label}</h5>
      <input
        {...input}
        className="input"
        type={label === "Contraseña" ? "password" : "text"}
      />
    </div>
    {meta.error && meta.touched && (
      <span className="error-message">{meta.error}</span>
    )}
  </div>
);

const LoginForm = ({ handleSubmit, submitting, onSubmit }) => {
  return (
    <div className="login-form">
      <h2>Bienvenido</h2>
      <form onSubmit={handleSubmit((values) => onSubmit(values))}>
        <Field
          name="user"
          type="text"
          label="Usuario"
          component={renderInput}
        />
        <Field
          name="password"
          type="password"
          label="Contraseña"
          component={renderInput}
        />
        <Link to="/register">
          <small>¿No tienes una cuenta?</small>
        </Link>
        <button className="login-btn" type="submit" disabled={submitting}>
          Login
        </button>
      </form>
    </div>
  );
};

const validate = (values) => {
  const errors = {};

  if (!values.user) {
    errors.user = "Campo requerido";
  }

  if (!values.password) {
    errors.password = "Campo requerido";
  }

  return errors;
};

export default reduxForm({
  form: "LoginForm",
  destroyOnUnmount: false,
  validate,
})(
  connect(
    (state) => ({
      isLoading: selectors.getIsAuthenticating(state),
      error: selectors.getAuthenticatingError(state),
      isAuthenticated: selectors.isAuthenticated(state),
      authUsername: selectors.getAuthUsername(state),
    }),
    (dispatch) => ({
      onSubmit(values) {
        const { user, password } = values;
        dispatch(actions.startLogin(user, password));
      },
    })
  )(LoginForm)
);
