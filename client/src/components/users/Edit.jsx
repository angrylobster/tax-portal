import React, { Component } from 'react'

class Edit extends Component {

    constructor(){
        super();
        this.state = {
            user: null
        }
    }

    componentDidMount(){
        fetch(`/users/${this.props.match.params.id}`)
        .then(res => {
          return res.json();
        })
        .then(json => {
          this.setState({
            user: json[0],
          });
        });
    }

  render () {
      console.log('edit form', this.state);
    return (
      <form action={`/users/edit/${this.props.match.params.id}?_method=PUT`} method='POST'>
        <p>Email</p>
        <input
          name='email'
          placeholder='Email address'
          defaultValue={this.state.user ? this.state.user.email : ''}
        />
        <p>Password</p>
        <input
          name='password'
          placeholder='Password'
          type='password'
          defaultValue={this.state.user ? this.state.user.password : ''}
        />
        <p>Address</p>
        <input
          name='address'
          placeholder='Address'
          defaultValue={this.state.user ? this.state.user.address : ''}
        />
        <p>Tax Registration Number</p>
        <input
          name='taxRegistration'
          placeholder='Tax Registration Number'
          defaultValue={this.state.user ? this.state.user.tax_registration : ''}
        />
        <p>Contact number</p>
        <input
          name='contactNumber'
          placeholder='Contact Number'
          defaultValue={this.state.user ? this.state.user.contact_number : ''}
        />
        <br />
        <br />
        <input type='submit' />
      </form>
    )
  }
}

export default Edit
