import React from "react";

import * as selectors from "../../../../reducers";
import * as actions from "../../../../actions/navigation";

import "./styles.css";
import { connect } from "react-redux";

const FollowNavigation = ({ followNavigation, onClick }) => {
  return (
    <div className="follow-navigation">
      <div
        className={
          followNavigation === "Siguiendo" ? "following active" : "following"
        }
        onClick={() => onClick("Siguiendo")}
      >
        Siguiendo
      </div>
      <div
        className={
          followNavigation === "Seguidores" ? "followers active" : "followers"
        }
        onClick={() => onClick("Seguidores")}
      >
        Seguidores
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    followNavigation: selectors.getFollowNavigationWindow(state),
  }),
  (dispatch) => ({
    onClick(window) {
      dispatch(actions.changeFollowNavigation(window));
    },
  })
)(FollowNavigation);
