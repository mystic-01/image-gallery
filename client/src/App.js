import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/favourites" component={() => <Home favourites />} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={() => <Login signUpPage />} />
      </Switch>
    </Router>
  );
};

export default App;
