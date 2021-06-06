import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faRetweet,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import userlogo from "../../img/userlogo.svg";

import * as retweetActions from "../../actions/retweetsomething";
import * as favActions from "../../actions/favsomething";
import * as saveActions from "../../actions/savesomething";
import * as selectors from "../../reducers";

import "./styles.css";

const Tweet = ({
  tweetInfo,
  makeComment,
  makeRetweet,
  addFav,
  addSaved,
  userName,
}) => {
  return (
    <div className="tweet-main-container">
      <div className="tweet-something-user-logo-container">
        <img src={userlogo} alt="" />
      </div>
      <div className="tweet-info">
        <div className="tweet-something-user">
          <h3>{"@" + tweetInfo.user_id}</h3>
          <h5>{tweetInfo.tweeted_date}</h5>
        </div>
        <div className="tweet-content">
          <p>{tweetInfo.tweet}</p>
        </div>
        <div className="tweet-data">
          <div className="interaction-holder">
            <div
              className="tweet-interaction"
              onClick={() => makeComment(tweetInfo)}
            >
              <FontAwesomeIcon icon={faComment} />
            </div>
          </div>
          {userName === tweetInfo.user_id ? null : (
            <div className="interaction-holder">
              <div
                className="tweet-interaction tweet-interaction-fav"
                onClick={() => addFav(tweetInfo)}
              >
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div className="tweet-info-count">
                <p>{tweetInfo.favs}</p>
              </div>
            </div>
          )}
          {userName === tweetInfo.user_id ? null : (
            <div className="interaction-holder">
              <div
                className="tweet-interaction tweet-interaction-retweet"
                onClick={() => makeRetweet(tweetInfo)}
              >
                <FontAwesomeIcon icon={faRetweet} />
              </div>
              <div className="tweet-info-count">
                <p>{tweetInfo.retweets}</p>
              </div>
            </div>
          )}
          {userName === tweetInfo.user_id ? null : (
            <div className="interaction-holder">
              <div
                className="tweet-interaction"
                onClick={() => addSaved(tweetInfo)}
              >
                <FontAwesomeIcon icon={faBookmark} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    userName: selectors.getAuthUsername(state),
  }),
  (dispatch) => ({
    makeComment(tweetInfo) {
      console.log(tweetInfo);
    },
    makeRetweet(tweetInfo) {
      dispatch(retweetActions.startRetweet(tweetInfo));
    },
    addFav(tweetInfo) {
      dispatch(favActions.startFavTweet(tweetInfo));
    },
    addSaved(tweetInfo) {
      dispatch(saveActions.startSaveTweet(tweetInfo));
    },
  })
)(Tweet);
