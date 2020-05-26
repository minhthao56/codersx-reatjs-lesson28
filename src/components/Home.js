import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Home extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user/create">CreateUser</Link>
          </li>
          <li>
            <Link to="/user/login">Login</Link>
          </li>
        </ul>

        <hr />
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;
