import React, { Component } from 'react'
import axios from 'axios'

class Registration extends Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      errors: {
        email: null,
        password: null,
        confirmPassword: null,
        taxRegistration: null,
        address: null,
        contactNumber: null,
      }
    }
  }

  handleSubmit (e) {
    e.preventDefault();
    const postObject = {};
    e.target.querySelectorAll('input').forEach(input => {
      postObject[input.name] = input.value
    })
    axios
      .post('/users/create', postObject)
      .then(response => {
        window.location = '/';
      })
      .catch(err => {
        const errorCopy = this.state.errors;
        err.response.data.errors.forEach(error => {
          for (let key in error){
            errorCopy[key] = error[key];
          }
        })
        this.setState({ errors: errorCopy })
      })
  }

  renderError(type){
    return this.state.errors && <small className="text-danger">{this.state.errors[type]}</small>
  }

  render () {
    console.log(this.state)
    return (
      <div className='card w-50 m-auto'>
        <article className='card-body'>
          <h4 className='card-title text-center mb-4 mt-1'>
            Register New Account
          </h4>
          <p className='text-success text-center'>Some message goes here</p>
          <form onSubmit={e => this.handleSubmit(e)}>
            <div className='form-group'>
              <div className='input-group'>
                <input
                  name='email'
                  className='form-control'
                  placeholder='Email address'
                  type='email'
                />
              </div>
                {this.renderError('email')}
            </div>

            <div className='form-group'>
              <div className='input-group'>
                <input
                  name='password'
                  className='form-control'
                  placeholder='Password'
                  type='password'
                />
              </div>
              {this.renderError('password')}
            </div>

            <div className='form-group'>
              <div className='input-group'>
                <input
                  name='confirmPassword'
                  className='form-control'
                  placeholder='Re-type password'
                  type='password'
                />
              </div>
              {this.renderError('confirmPassword')}
            </div>

            <div className='form-group'>
              <div className='input-group'>
                <input
                  name='taxRegistration'
                  className='form-control'
                  placeholder='Tax registration number'
                />
              </div>
              {this.renderError('taxRegistration')}
            </div>

            <div className='form-group'>
              <div className='input-group'>
                <input
                  name='address'
                  className='form-control'
                  placeholder='Address'
                />
              </div>
              {this.renderError('address')}
            </div>

            <div className='form-group'>
              <div className='input-group'>
                <input
                  name='contactNumber'
                  className='form-control'
                  placeholder='Contact number'
                />
              </div>
              {this.renderError('contactNumber')}
            </div>

            <div className='form-group'>
              <button type='submit' className='btn btn-primary btn-block'>
                {' '}
                Login{' '}
              </button>
            </div>
          </form>
        </article>
      </div>
    )
  }
}

export default Registration
