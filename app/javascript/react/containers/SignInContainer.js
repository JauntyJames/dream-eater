import React, { Component } from 'react';

import Functions from '../utils/Functions'

class SignInContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirm: ""
    }
    this.handleConfirmChange = this.handleConfirmChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleConfirmChange(event) {
    let value = event.target.value
    this.setState({ confirm: value })
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
    fetch('/users/sign_in', {
      method: "POST",
      body: {
        user: {
          email: this.state.email,
          password: this.state.password
        },
        authenticity_token: Functions.getMetaContent('csrf-token')
      }
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
          type="password"
          name="confirm"
          placeholder="retype password"
          value={this.state.confirm}
          onChange={this.handleConfirmChange}
        />
        <input
          type="submit"
          onClick={this.handleSubmit} defaultValue="login"
        />
      </form>
    )
  }
}

export default SignInContainer;
