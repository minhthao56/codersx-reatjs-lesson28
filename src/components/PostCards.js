import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import HeartImage from "../images/heart.svg";

import "../styles/PostCard.css";

import Moment from "react-moment";
import "moment-timezone";
import axios from "axios";

export class PostCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }
  handleValueComment = (event) => {
    this.setState({
      comment: event.target.value,
    });
  };
  handleSubmitComment = (event) => {
    event.preventDefault();
    const useLoggedIn = this.props.useLoggedIn;
    const id_post = this.props.id_post;
    const valueComment = this.state.comment;
    const comment = {
      id_user_commented: useLoggedIn._id,
      id_post: id_post,
      comment_content: valueComment,
    };
    axios.post("http://localhost:3001/posts/comments", comment).then((res) => {
      this.setState({
        comment: "",
      });
    });
  };
  render() {
    const {
      name,
      avatarUrl,
      imagePosUrl,
      title,
      createdAt,
      description,
      index,
      comment,
    } = this.props;
    return (
      <div className="container-postcard">
        <div className="header-card">
          <div className="img-name">
            <img src={avatarUrl} />
            <span>{name}</span>
          </div>
          <FontAwesomeIcon icon={faEllipsisH} />
        </div>
        <div className="context-card">
          <img src={imagePosUrl} />
          <div className="icon-heart">
            <img src={HeartImage} />
            <span>
              <Moment fromNow>{createdAt}</Moment>
            </span>
          </div>
          <h6 className="title-card">{title}</h6>
          <p className="description-card">{description}</p>
        </div>
        <div className="form-comment">
          <form onSubmit={this.handleSubmitComment}>
            <input
              type="text"
              onChange={this.handleValueComment}
              value={this.state.comment}
            />
            <button type="submit">Post</button>
          </form>
        </div>
        <div className="container-comments">
          {comment.map(function (user) {
            return (
              <div className="comment">
                <img src={user.avatarUrl} />
                <span className="name-comment">{user.name}</span>
                <span className="comment-content">{user.comment_content}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PostCards;
