import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

export class NotificationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataNotifications: [],
    };
  }
  componentDidMount() {
    const idUserLogin = this.props.logIn.dataUser._id;
    axios
      .get("http://localhost:3001/posts/notification?q=" + idUserLogin)
      .then((res) => {
        this.setState({
          dataNotifications: res.data,
        });
      });
  }
  render() {
    const dataNotifications = this.state.dataNotifications;

    return (
      <div>
        <div className="Container-notification">
          <ul>
            {dataNotifications.map((notification, key) => {
              return (
                <li key={key}>
                  {notification.name} {notification.content}{" "}
                  {notification.title}
                </li>
              );
            })}
          </ul>
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
export default connect(mapStateToProps)(NotificationCard);
