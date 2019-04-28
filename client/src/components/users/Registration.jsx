import React, { Component } from "react";

class Registration extends Component {
  render() {
    return (
      <form action="/users/create" method="POST">
        <p>Email</p>
        <input name="email" placeholder="Email address" />
        <p>Password</p>
        <input name="password" placeholder="Password" type="password" />
        <p>Address</p>
        <input name="address" placeholder="Address"/>
        <p>Tax Registration Number</p>
        <input name="taxRegistration" placeholder="Tax Registration Number"/>
        <p>Contact number</p>
        <input name="contactNumber" placeholder="Contact Number"/>
        <br/>
        <br/>
        <input type="submit"/>
      </form>
    );
  }
}

export default Registration;
