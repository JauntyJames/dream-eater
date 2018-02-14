import React, { Component } from 'react';

import UserDetails from '../components/UserDetails'
import ComicTile from '../components/ComicTile'

class UserBookshelfContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
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
      this.setState({ user: body.user, favorites: body.user.favorites })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let myFavorites = this.state.favorites.map((comic) => {
      return(
        <ComicTile
          key={comic.id}
          id={comic.id}
          thumb={comic.file.thumb.url}
          title={comic.title}
        />
      )
    })

    return(
      <div id="bookshelf" className="row">
        <UserDetails
          user={this.state.user}
        />
        <h3>My favorite comics:</h3>
        {myFavorites}
      </div>
    )
  }
}

export default UserBookshelfContainer;
