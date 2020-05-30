import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import ImgInstagram from "../images/1200px-Instagram_logo.svg.png";
import "../styles/CreateUser.css";

import appleImage from "../images/app-icon.png";
import playStoreImage from "../images/googleplay.png";

export class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      isDone: false,
    };
  }
  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    axios.post("http://localhost:3001/users/create", user).then((res) => {
      // console.log(res);
      // console.log(res.data); chuyển từ trên xuống
      this.setState({
        name: "",
        email: "",
        password: "",
        isDone: true,
      });
    });
  };

  render() {
    if (this.state.isDone === true) {
      return (
        <Redirect
          to={{
            pathname: "/user/login",

            state: { isAuth: true },
          }}
        />
      );
    }
    return (
      <div className="container-fluid">
        <div className="container-form">
          <img src={ImgInstagram} alt="" />
          <h6>Sign up to see photos and videos from your friends.</h6>
          <form
            method="POST"
            onSubmit={this.handleSubmit}
            encType="multipart/form-data"
          >
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              ></input>
            </div>

            <button type="submit">Sign up</button>
            <p className="policy">
              By signing up, you agree to our{" "}
              <b>Terms , Data Policy and Cookies Policy .</b>
            </p>
          </form>
        </div>
        <div className="have-account">
          <span>
            Have an account? <Link to="/user/login">Log in</Link>
          </span>
        </div>
        <div className="image-link">
          <p>Get the app.</p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://apps.apple.com/app/instagram/id389801252?vt=lo"
          >
            <img src={appleImage} alt="" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DsignupPage%26ig_mid%3DA85B7263-C3FB-4EA7-B5ED-8E7CF284B2BA%26utm_content%3Dlo%26utm_medium%3Dbadge"
          >
            <img src={playStoreImage} alt="" />
          </a>
        </div>
      </div>
    );
  }
}

export default CreateUser;
