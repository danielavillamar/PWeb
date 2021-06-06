 import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faRetweet,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import userLogo from "../../../../img/userlogo.svg";
import { connect } from "react-redux";

import * as selectors from "../../../../reducers";
import * as actions from "../../../../actions/navigation";

import "./styles.css";
import { Link } from "react-router-dom";

const UserInfo = ({
  userName,
  following,
  followers,
  navigationStatus,
  onClick,
  onList,
}) => {
  return (
    <div className="user-info-container">
      <div className="user-info">
        <div className="info">
          <img src={userLogo} alt="" />
          <h3>{"@" + userName}</h3>
          <div className="follows">
            <p>{following}</p>
            <Link to="/follow-info" onClick={() => onList("Siguiendo")}>
              <p>Siguiendo</p>
            </Link>
            <p>{followers}</p>
            <Link to="/follow-info" onClick={() => onList("Seguidores")}>
              <p>Seguidores</p>
            </Link>
          </div>
        </div>
        <div className="edit-profile">
          <div className="edit-profile-btn">Editar Perfil</div>
        </div>
      </div>
      <div className="profile-navigation">
        <div
          className={
            navigationStatus === "Tweets" ? "navigation active" : "navigation"
          }
          onClick={() => onClick("Tweets")}
        >
          <img
            src="https://pngimg.com/uploads/twitter/twitter_PNG15.png"
            alt=""
          />
          <h5>Tweets</h5>
        </div>
        <div
          className={
            navigationStatus === "Favourites"
              ? "navigation fvactive"
              : "navigation fvnavigation"
          }
          onClick={() => onClick("Favourites")}
        >
          <FontAwesomeIcon icon={faHeart} />
          <h5>Favoritos</h5>
        </div>
        <div
          className={
            navigationStatus === "Retweets"
              ? "navigation rtwactive"
              : "navigation rtwnavigation"
          }
          onClick={() => onClick("Retweets")}
        >
          <FontAwesomeIcon icon={faRetweet} />
          <h5>Retweets</h5>
        </div>
        <div
          className={
            navigationStatus === "Saved" ? "navigation active" : "navigation"
          }
          onClick={() => onClick("Saved")}
        >
          <FontAwesomeIcon icon={faBookmark} />
          <h5>Guardados</h5>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    userName: selectors.getAuthUsername(state),
    navigationStatus: selectors.getNavigationWindow(state),
    following: selectors.getFollowingList(state)
      ? Object.keys(selectors.getFollowingList(state)).length
      : 0,
    followers: selectors.getFollowersList(state)
      ? Object.keys(selectors.getFollowersList(state)).length
      : 0,
  }),
  (dispatch) => ({
    onClick(window) {
      dispatch(actions.changeNavigationWindow(window));
    },
    onList(window) {
      dispatch(actions.changeFollowNavigation(window));
    },
  })
)(UserInfo);
