import React, { Component } from 'react';
import { Link } from 'react-router'

import ComicDetails from '../components/ComicDetails'
import ComicDisplay from './ComicDisplay'

class ComicShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      editable: false,
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
      this.setState({ comic: body.comic, bookmark: bookmark, editable: body.comic.editable })
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
          <div>
            <ComicDisplay comic={this.state.comic} bookmark={this.state.bookmark} />
            <button onClick={this.handleLoad}>Close Reader</button>
          </div>
        )
      } else {
        return (
          <span>
            <button onClick={this.handleLoad}>Read Me!</button>
            {editMe()}
          </span>
        )
      }
    }

    let editMe = () => {
      if (this.state.editable){
        return (
          <Link to={`/comics/edit/${this.state.comic.id}`}><button>Edit Comic Info</button></Link>
        )
      }
    }

    return(
      <div>
        <ComicDetails
          comic={this.state.comic}
        />
        {loadedComic()}
        {this.props.children}
      </div>
    )
  }
}

export default ComicShowPage;
