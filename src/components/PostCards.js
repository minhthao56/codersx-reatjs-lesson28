import React, { Component } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import HeartImage from "../images/heart.svg";
import HeartImageRed from "../images/heart -red.svg";

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
  // Handle Comments
  handleValueComment = (event) => {
    this.setState({
      comment: event.target.value,
    });
  };
  handleSubmitComment = (event) => {
    event.preventDefault();
    const useLoggedIn = this.props.logIn.dataUser;
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

  //Handle like
  handleLike = () => {
    const useLoggedIn = this.props.logIn.dataUser;
    const id_post = this.props.id_post;
    const like = {
      id_user_liked: useLoggedIn._id,
      id_post: id_post,
    };
    axios.post("http://localhost:3001/posts/like", like).then((res) => {
      // console.log(res.data);
    });

    const id_user_post = this.props.idUser;
    const contentNotifications = "Like";
    const notificationLike = {
      id_user_liked: useLoggedIn._id,
      id_user_post: id_user_post,
      id_post: id_post,
      content: contentNotifications,
    };
    axios
      .post("http://localhost:3001/posts/notification", notificationLike)
      .then((res) => {
        console.log(res.data);
      });
  };

  // Handle Unlike
  handleUnLike = () => {
    const useLoggedIn = this.props.logIn.dataUser;
    const id_post = this.props.id_post;
    const like = {
      id_user_liked: useLoggedIn._id,
      id_post: id_post,
    };
    axios.post("http://localhost:3001/posts/unlike", like).then((res) => {
      // console.log(res.data);
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
      comment,
      like,
      idUser,
    } = this.props;
    const useLoggedIn = this.props.logIn.dataUser;
    const arrIdUserLiked = like.filter(function (userLiked) {
      return userLiked.id_user_liked === useLoggedIn._id;
    });
    return (
      <div className="container-postcard">
        <div className="header-card">
          <div className="img-name">
            <img src={avatarUrl} alt="" />
            <span>{name}</span>
          </div>
          <FontAwesomeIcon icon={faEllipsisH} />
        </div>
        <div className="context-card">
          <img src={imagePosUrl} alt="" />
          <div className="icon-heart">
            {arrIdUserLiked.length ? (
              <img src={HeartImageRed} alt="" onClick={this.handleUnLike} />
            ) : (
              <img src={HeartImage} alt="" onClick={this.handleLike} />
            )}
            <span>{like.length}Peple</span>
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
          {comment.map(function (user, key) {
            return (
              <div className="comment" key={key}>
                <img src={user.avatarUrl} alt="" />
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
const mapStateToProps = (state) => {
  return {
    logIn: state.logIn,
  };
};

export default connect(mapStateToProps)(PostCards);
