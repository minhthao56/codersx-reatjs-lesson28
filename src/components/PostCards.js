import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import HeartImage from "../images/heart.svg";
import "../styles/PostCard.css";
import Moment from "react-moment";
import "moment-timezone";

export class PostCards extends Component {
  render() {
    const {
      name,
      avatarUrl,
      imagePosUrl,
      title,
      createdAt,
      description,
      index,
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
        <div>
          <form onSubmit={this.handleComment}>
            <input type="text" />
            <button type="submit">Comment</button>
          </form>
        </div>
        <div>
          <ul>
            <li>{index}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PostCards;
