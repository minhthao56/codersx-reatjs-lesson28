import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect, useSelector } from "react-redux";

import "./App.css";

import CreateUser from "./components/CreateUser";
import Home from "./components/Home";
import Login from "./components/Login";

export class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <Route path="/user/login">
              <Login />
            </Route>
            <Route path="/user/create">
              <CreateUser />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function PrivateRoute({ isAuthenticated, children, ...rest }) {
  const mapStateToProps = useSelector((state) => state.logIn);
  isAuthenticated = mapStateToProps.isAuth;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/user/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
const mapStateToProps = (state) => {
  return {
    logIn: state.logIn,
  };
};
export default connect(mapStateToProps)(App);
