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
  }
  componentDidMount() {
    this.componentDidMount = this.componentDidMount.bind(this)
    this.fetchComics = debounce(250, this.fetchComics).bind(this)
    this.handleChange = this.handleChange.bind(this)
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
        console.log(body)
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
    let uploadButton
    if (this.props.toggleForm) {
      uploadButton = (
        <div className="tip">
          <button onClick={this.props.toggleForm}>Upload New Comic</button>
          <span className="tiptext">Click here or drop a pdf anywhere on this page!</span>
        </div>
      )
    }
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
          {uploadButton}
        </div>
        <div className="comics-array">
          {comicsArray}
        </div>
      </div>
    )
  }
}

export default ComicsIndexContainer;
