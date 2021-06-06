import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { configureStore } from "../../store";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "../Login/login";
import Register from "../Register/register";
import Feed from "../Feed/feed";
import Profile from "../Profile/profile";
import Following from "../Following/following";
import SuggestionsPage from "../SuggestionsPage/suggestionspage";

const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/feed" exact component={Feed} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/follow-info" component={Following} />
          <Route path="/suggestions" component={SuggestionsPage} />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
