import React, { Component } from 'react';
import { debounce  } from 'throttle-debounce';

import ComicTile from '../components/ComicTile'

class ComicsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comics: [],
      search: ""
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.fetchComics = this.fetchComics.bind(this)
    this.fetchComics = debounce(250, this.fetchComics)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.fetchComics(this.state.search);
  }

  fetchComics(searchTerm) {
    fetch(`api/v1/comics?q=${searchTerm}`, {
      credentials: 'same-origin'})
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

  handleChange(event) {
    let value = event.target.value
    this.fetchComics(value)
    this.setState({ search: value })
  }

  render() {
    let comicsArray = this.state.comics.map((comic) => {
      return(
        <ComicTile
          key={comic.id}
          id={comic.id}
          title={comic.title}
          thumb={comic.thumbnail}
        />
      )
    })

    return(
      <div id="index-container">
        <div id="searchbar">
          <input
            id="search"
            type='text'
            value={this.state.search}
            onChange={this.handleChange}
            placeholder="Enter search terms"
          />
        </div>
        {comicsArray}
      </div> 
    )
  }
}

export default ComicsIndexContainer;
