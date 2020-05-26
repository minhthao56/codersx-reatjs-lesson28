import React from "react";
import "./App.css";
import CreateUser from "./components/CreateUser";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/user/create">
            <CreateUser />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
