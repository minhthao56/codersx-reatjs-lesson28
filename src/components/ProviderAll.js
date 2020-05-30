import React, { Component } from "react";
import axios from "axios";
export const Context = React.createContext();

export class ProviderAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      mes: "",
      isAuth: false,
      dataUser: {},
    };
  }
  handleSubmit = (event, user) => {
    event.preventDefault();

    // const user = {
    //   email: this.state.email,
    //   password: this.state.password,
    // };
    axios
      .post("http://localhost:3001/users/login", user)
      .then((res) => {
        this.setState({
          isAuth: true,
          dataUser: res.data,
        });
        console.log(this.state.isAuth);
        // this.props.PassDataToApp(this.state.dataUser);
        // this.props.PassDataLogin(this.state.isAuth);
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
    return (
      <Context.Provider
        value={{
          mes: this.state.mes,
          isAuth: this.state.isAuth,
          dataUser: this.state.dataUser,
          handleSubmit: this.handleSubmit,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default ProviderAll;
