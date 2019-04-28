import React, { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    fetch("/users")
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({
          users: json,
        });
      });
  }

  renderUsers() {
    if (this.state.users) {
      return this.state.users.map(user => {
        return (
          <tr key={user.email + user.id}>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td>{user.tax_registration}</td>
            <td>{user.updated_at}</td>
            <td
              onClick={() => {
                fetch("/users/destroy", {
                  method: "DELETE", // *GET, POST, PUT, DELETE, etc.
                  mode: "cors", // no-cors, cors, *same-origin
                  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                  credentials: "same-origin", // include, *same-origin, omit
                  headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "application/x-www-form-urlencoded",
                  },
                  redirect: "follow", // manual, *follow, error
                  referrer: "no-referrer", // no-referrer, *client
                  body: JSON.stringify(user), // body data type must match "Content-Type" header
                });
              }}
            >
              x
            </td>
          </tr>
        );
      });
    }
    return null;
  }

  render() {
    console.log(this.state);
    return (
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Email</td>
            <td>Address</td>
            <td>Tax Registration</td>
            <td>Last Updated</td>
          </tr>
        </thead>
        <tbody>{this.renderUsers()}</tbody>
      </table>
    );
  }
}

export default Home;
