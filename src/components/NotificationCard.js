import React, { Component } from "react";
import axios from "axios";

export class NotificationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataNotifications: [],
    };
  }
  componentDidMount() {
    const idUserLogin = this.props.idUserLogin;
    axios
      .get("http://localhost:3001/posts/notification?q=" + idUserLogin)
      .then((res) => {
        console.log(res.data);

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
            {dataNotifications.map((notification) => {
              return (
                <li>
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

export default NotificationCard;
