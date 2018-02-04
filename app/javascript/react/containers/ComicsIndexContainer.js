import React, { Component } from 'react';

import ComicTile from '../components/ComicTile'

class ComicsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comics: []
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount() {
    fetch('api/v1/comics')
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
      this.setState({ comics: body.comics })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let comicsArray = this.state.comics.map((comic) => {
      return(
        <ComicTile
          key={comic.id}
          id={comic.id}
          title={comic.title}
          thumb={comic.file.thumb}
        />
      )
    })

    return(
      <div>
        {comicsArray}
      </div>
    )
  }
}

export default ComicsIndexContainer;
