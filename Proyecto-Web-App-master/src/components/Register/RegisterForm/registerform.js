import React from "react";
import { Field, reduxForm } from "redux-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faAt } from "@fortawesome/free-solid-svg-icons";
import isValidEmail from "sane-email-validation";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../actions/createuser";
import * as selectors from "../../../reducers";

const renderInput = ({ input, meta, label, icon }) => (
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
      <FontAwesomeIcon icon={icon} />
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

const RegisterForm = ({ handleSubmit, submitting, onSubmit }) => {
  return (
    <div className="login-form">
      <h2>Bienvenido</h2>
      <form onSubmit={handleSubmit((values) => onSubmit(values))}>
        <Field
          name="user"
          type="text"
          label="Usuario"
          icon={faUser}
          component={renderInput}
        />
        <Field
          name="name"
          type="text"
          label="Nombre"
          icon={faUser}
          component={renderInput}
        />
        <Field
          name="email"
          type="text"
          label="Correo Electronico"
          icon={faAt}
          component={renderInput}
        />
        <Field
          name="password"
          type="password"
          label="Contraseña"
          icon={faLock}
          component={renderInput}
        />
        <Link to="/">
          <small>¿Ya tienes una cuenta?</small>
        </Link>
        <button className="login-btn" type="submit" disabled={submitting}>
          Crear Cuenta
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

  if (!values.name) {
    errors.name = "Campo requerido";
  }

  if (!values.email) {
    errors.email = "Campo requerido";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Correo invalido";
  }

  if (!values.password) {
    errors.password = "Campo requerido";
  }

  return errors;
};

export default reduxForm({
  form: "RegisterForm",
  destroyOnUnmount: false,
  validate,
})(
  connect(
    (state) => ({
      isLoading: selectors.getIsCreatingUser(state),
      error: selectors.getCreatingUserErrorMsg(state),
    }),
    (dispatch) => ({
      onSubmit(values) {
        const { user, email, password, name } = values;
        dispatch(actions.createUser(user, email, password, name));
      },
    })
  )(RegisterForm)
);
