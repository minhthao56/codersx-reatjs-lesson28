import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ImgInstagram from "../images/1200px-Instagram_logo.svg.png"

export class CreateUser extends Component {
  render() {
    return (
      <div className="container-form">
        <img src ={ImgInstagram}>
        <form>
          <div className="form-group">
            <label for="tEmail">Email address</label>
            <input type="email"></input>
          </div>
          <div className="form-group">
            <label for="Password">Password</label>
            <input type="email"></input>
          </div>
          <label for="Password">Your Avatar</label>
          <br />
          <div className="form-group">
            <input type="file" />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreateUser;
