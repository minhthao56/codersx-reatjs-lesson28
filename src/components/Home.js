import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import PostCards from "../components/PostCards";
import "../styles/Home.css";
import HeartImage from "../images/heart.svg";
import NotificationCard from "../components/NotificationCard";
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      title: "",
      description: "",
      dataPost: [],
    };
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
    const user = this.props.user;
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

  render() {
    const dataPost = this.state.dataPost;

    const idUserLogin = this.props.user._id;

    return (
      <div className="container-fluid">
        <p>{this.props.user.name}</p>
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
          <li>
            <img src={HeartImage} onClick={this.handleNotification} />
            <span>(1)</span>
            <NotificationCard idUserLogin={idUserLogin} />
          </li>
        </ul>
        <hr />
        {/* Home */}
        <div className="container-post">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
            <textarea
              rows="7"
              cols="50"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            ></textarea>
            <input type="file" onChange={this.handleFile} />
            <button type="submit">Post</button>
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
                index={index}
                useLoggedIn={this.props.user}
                id_post={post.id_post}
                comment={post.comment}
                like={post.like}
                idUser={post.idUser}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
