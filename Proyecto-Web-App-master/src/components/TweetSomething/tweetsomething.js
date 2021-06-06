import React from "react";
import { v4 as uuid } from "uuid";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import userlogo from "../../img/userlogo.svg";

import * as selectors from "../../reducers";
import * as actions from "../../actions/tweetsomething";

import "./styles.css";

const dateFormat = require("dateformat");

const renderInput = ({ input, meta, label }) => (
  <div
    className={
      meta.active
        ? "input-div one focus"
        : meta.errors
        ? "input-div one form-error"
        : meta.dirty
        ? "input-div one focus"
        : "input-div one"
    }
  >
    {/*<div className="i">
      <img src="https://pngimg.com/uploads/twitter/twitter_PNG15.png" alt="" />
    </div>*/ }
    <div>
      <h5>{label}</h5>
      <input {...input} className="input" />
    </div>
    {meta.error && meta.touched && (
      <span className="error-message">{meta.error}</span>
    )}
  </div>
);

const TweetSomething = ({ username, handleSubmit, submitting, onSubmit }) => {
  return (
    <div className="tweet-something-main-container">
      <div className="tweet-something-user-logo-container">
        <img src={userlogo} alt="" />
      </div>
      <div className="tweet-something-container">
        <div className="tweet-something-user">
          <h3>{"@" + username}</h3>
        </div>
        <div className="tweet-something">
          <form
            onSubmit={handleSubmit((values) => {
              values.user_id = username;
              onSubmit(values);
            })}
          >
            <Field
              name="tweet"
              type="text"
              label="¿Qué estás pensando?"
              component={renderInput}
            />
            <button
              className="tweet-something-btn"
              type="submit"
              disabled={submitting}
            >
              Tweet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const validate = (values) => {
  const errors = {};

  if (!values.tweet) {
    errors.emptyTweet = "No se pueden hacer Tweets en vacios.";
  } else if (values.tweet.length > 280) {
    errors.tweet = "Ups! Tu tweet debe tener menos de 280 caracteres.";
  }

  return errors;
};

export default reduxForm({
  form: "TweetForm",
  destroyOnUnmount: false,
  validate,
})(
  connect(
    (state) => ({
      username: selectors.getAuthUsername(state),
    }),
    (dispatch) => ({
      onSubmit(values) {
        values.id = uuid();
        const date = dateFormat(new Date(), "yyyy-mm-dd");
        values.tweeted_date = date;
        dispatch(actions.startPosting(values));
      },
    })
  )(TweetSomething)
);
