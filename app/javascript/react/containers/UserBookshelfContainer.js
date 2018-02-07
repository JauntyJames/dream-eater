import React, { Component } from 'react';

class UserBookshelfContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      favorites: []
    }
  }

  componentDidMount() {
    let id = this.props.params.id
    fetch(`/api/v1/users/${id}`, {
      credentials: 'same-origin'
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
      this.setState({ user: body.user, favorites: body.favorites })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    return(
      <div>{this.state.user.email}</div>
    )
  }
}

export default UserBookshelfContainer;
