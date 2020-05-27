import React, { Component } from "react";
import "./App.css";
import CreateUser from "./components/CreateUser";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      dataUser: "",
    };
  }
  DataUser = (dataUser) => {
    this.setState({
      dataUser: dataUser,
    });
  };
  render() {
    return (
      <Router>
        <div>{this.state.dataUser.name}Ok chưa</div>
        <div>
          <Switch>
            <Route exact path="/">
              <Home user={this.state.dataUser} />
            </Route>
            <Route path="/user/login">
              <Login PassDataToApp={this.DataUser} />
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

export default App;
