import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";

import CreateUser from "./components/CreateUser";
import Home from "./components/Home";
import Login from "./components/Login";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      dataUser: {},
      isLoggin: false,
    };
  }
  DataUser = (dataUser) => {
    this.setState({
      dataUser: dataUser,
    });
  };
  isLoggin = (isAuth) => {
    this.setState({
      isLoggin: isAuth,
    });
  };
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <PrivateRoute exact path="/" isAuthenticated={this.state.isLoggin}>
              <Home user={this.state.dataUser} />
            </PrivateRoute>
            <Route path="/user/login">
              <Login
                PassDataToApp={this.DataUser}
                PassDataLogin={this.isLoggin}
              />
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
  console.log(isAuthenticated);
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
export default App;
