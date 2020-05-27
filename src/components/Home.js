import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "mongoose";
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      title: "",
      description: "",
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
  //file
  handleFile = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  };
  //form
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
      console.log(res);
      console.log(res.data);
    });
  };
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
        {/* Home */}
        <div>
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
      </div>
    );
  }
}

export default Home;
