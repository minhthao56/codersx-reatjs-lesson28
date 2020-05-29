import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";

import appleImage from "../images/app-icon.png";
import playStoreImage from "../images/googleplay.png";
import ImgInstagram from "../images/1200px-Instagram_logo.svg.png";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      mes: "",
      isAuth: false,
      dataUser: {},
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
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("http://localhost:3001/users/login", user)
      .then((res) => {
        this.setState({
          isAuth: true,
          dataUser: res.data,
        });

        this.props.PassDataToApp(this.state.dataUser);
      })

      .catch((err) => {
        if (err.response.status === 401) {
          this.setState({
            mes: err.response.data.msg,
          });
        }
        // console.log(err);
      });
  };

  render() {
    if (this.state.isAuth === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container-fluid">
        <div className="container-form">
          <img src={ImgInstagram} alt="" />
          {this.state.mes ? (
            <div className="alert alert-danger" role="alert">
              {this.state.mes}
            </div>
          ) : null}

          <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
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
            <button type="submit">Log in</button>
          </form>
        </div>
        <div className="have-account">
          <span>
            Don't have an account? <Link to="/user/create">Sign up</Link>
          </span>
        </div>
        <div className="image-link">
          <p>Get the app.</p>
          <a
            target="_blank"
            href="https://apps.apple.com/app/instagram/id389801252?vt=lo"
          >
            <img src={appleImage} />
          </a>
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DsignupPage%26ig_mid%3DA85B7263-C3FB-4EA7-B5ED-8E7CF284B2BA%26utm_content%3Dlo%26utm_medium%3Dbadge"
          >
            <img src={playStoreImage} />
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
