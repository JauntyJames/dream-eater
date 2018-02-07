import React, { Component } from 'react';

import Details from '../components/Details'
import ComicDisplay from './ComicDisplay'

class ComicShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      comic: null,
      bookmark: null
    }
    this.handleLoad = this.handleLoad.bind(this)
  }

  componentDidMount() {
    let id = this.props.params.id
    fetch(`/api/v1/comics/${id}`,
      {credentials: "same-origin"}
    )
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
      let bookmark
      if (body.comic.user_bookmark){
        bookmark = body.comic.user_bookmark.bookmark
      }
      this.setState({ comic: body.comic, bookmark: bookmark })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleLoad() {
    this.setState({ loaded: !this.state.loaded })
  }

  render() {
    let loadedComic = () => {
      if (this.state.loaded) {
        return (
          <ComicDisplay comic={this.state.comic} />
        )
      } else {
        return (
          <button onClick={this.handleLoad}>Read Me!</button>
        )
      }
    }

    return(
      <div>
        <Details
          comic={this.state.comic}
        />
        {loadedComic()}
      </div>
    )
  }
}

export default ComicShowPage;
