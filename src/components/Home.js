import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import PostCards from "../components/PostCards";
import "../styles/Home.css";
import HeartImage from "../images/heart.svg";
import NotificationCard from "../components/NotificationCard";
import IconUploadPost from "../images/picture.svg";
import LogoIntasgram from "../images/instagram-1.svg";
import HomeImage from "../images/home.svg";
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      title: "",
      description: "",
      dataPost: [],
      onNotification: false,
    };
    this.heartNoti = React.createRef();
  }
  // Handle inputs
  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };
  // Handle and file
  handleFile = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  };
  //Handle submit form
  handleSubmit = (event) => {
    event.preventDefault();
    const user = this.props.logIn.dataUser;
    const title = this.state.title;
    const description = this.state.description;
    const fd = new FormData();
    fd.append("fileImagePost", this.state.file);
    fd.append("user", user._id);
    fd.append("title", title);
    fd.append("description", description);

    axios.post("http://localhost:3001/posts/status", fd).then((res) => {
      this.setState({
        file: null,
        title: "",
        description: "",
      });
    });
  };
  // Render all post
  componentDidMount() {
    axios.get("http://localhost:3001/posts/status").then((res) => {
      this.setState({
        dataPost: res.data,
      });
    });
  }

  // Update re-render
  componentDidUpdate() {
    axios.get("http://localhost:3001/posts/status").then((res) => {
      this.setState({
        dataPost: res.data,
      });
    });
  }
  handleNotification = () => {
    this.setState({
      onNotification: !this.state.onNotification,
    });
  };

  render() {
    const dataPost = this.state.dataPost;
    const dataUserLoggedIn = this.props.logIn.dataUser;

    return (
      <div className="container-f">
        <nav className="navi-bar">
          <div className="contaiter-in-navi">
            <img id="Loginintas" src={LogoIntasgram} />
            <ul>
              <li>
                <Link to="/">
                  {" "}
                  <img src={HomeImage} />
                </Link>
              </li>
              <li>
                <img
                  src={HeartImage}
                  alt=""
                  onClick={this.handleNotification}
                />
                {this.state.onNotification ? <NotificationCard /> : null}
              </li>
              <li>
                <div className="container-avatar">
                  <img src={dataUserLoggedIn.avatarUrl} />
                  <span>{dataUserLoggedIn.name}</span>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        {/* Home */}
        <div className="container-home">
          <div className="container-post">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Your title"
                onChange={this.handleChange}
                value={this.state.title}
              />
              <textarea
                rows="7"
                cols="50"
                name="description"
                placeholder="What do you want to tell?"
                value={this.state.description}
                onChange={this.handleChange}
              ></textarea>

              <div className="button-submit-form">
                <label for="file">
                  <img src={IconUploadPost} />
                </label>
                <input type="file" id="file" onChange={this.handleFile} />
                <button type="submit">Post</button>
              </div>
            </form>
          </div>
          <div>
            {dataPost.map((post, index) => {
              return (
                <PostCards
                  name={post.name}
                  avatarUrl={post.avatarUrl}
                  imagePosUrl={post.imagePosUrl}
                  title={post.title}
                  createdAt={post.createdAt}
                  description={post.description}
                  key={index}
                  id_post={post.id_post}
                  comment={post.comment}
                  like={post.like}
                  idUser={post.idUser}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    logIn: state.logIn,
  };
};
export default connect(mapStateToProps)(Home);
