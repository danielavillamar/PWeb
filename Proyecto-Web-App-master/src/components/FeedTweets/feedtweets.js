import React from "react";
import { connect } from "react-redux";

import TweetSomething from "../TweetSomething/tweetsomething";
import Tweet from "../Tweet/tweet";
import * as selectors from "../../reducers";
import "./styles.css";

const FeedTweets = ({ tweets }) => {
  return (
    <div className="feed-tweets-main-container">
      <TweetSomething />
      {tweets && Object.keys(tweets).length !== 0 ? (
        Object.keys(tweets).map((tweetId) => {
          const tweet = tweets[tweetId];
          return <Tweet key={tweetId} tweetInfo={tweet} />;
        })
      ) : (
        <div>
          Aun no tienes tweets por ver. Te recomendamos seguir a mas personas.
        </div>
      )}
    </div>
  );
};

export default connect((state) => ({
  tweets: selectors.getFeedTweets(state),
}))(FeedTweets);
