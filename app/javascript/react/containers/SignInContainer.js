import React, { Component } from 'react';

import Functions from '../utils/Functions'

class SignInContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      remember_me: false
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmailChange(event) {
    let value = event.target.value
    this.setState({ email: value })
  }

  handlePasswordChange(event) {
    let value = event.target.value
    this.setState({ password: value })
  }

  handleSubmit() {
    let formPayload = {
      user: {
        email: this.state.email,
        password: this.state.password,
        remember_me: this.state.remember_me
      }
    }
    fetch('/users/sign_in', {
      credentials: 'same-origin',
      method: "POST",
      body: JSON.stringify(formPayload)
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {

    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    return(
      <div>
        <form>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <input
            name="remember_me"
            type="checkbox"
            onClick={this.handleCheck}
            checked={this.state.remember_me}
          /> Remember Me<br />
          <input
            type="submit"
            onClick={this.handleSubmit} defaultValue="login"
          />
        </form>
        <a href="/users/auth/goodreads" >Sign in with Goodreads</a>
      </div>
    )
  }
}

export default SignInContainer;
