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
    let editMe
    if (this.state.editable){
      editMe = (
        <Link to={`/comics/edit/${this.state.comic.id}`}><button>Edit Comic Info</button></Link>
      )
    }

    let loadedComic
    if (this.state.loaded) {
      loadedComic = (
        <div key="close" id="load-edit">
          <ComicDisplay comic={this.state.comic} bookmark={this.state.bookmark} />
          <button onClick={this.handleLoad}>Close Reader</button>
        </div>
      )
    } else {
      loadedComic = (
        <div key="open" id="load-edit">
          <a onClick={this.handleLoad} className="button large expanded" >Read Me!</a>
          {editMe}
        </div>
      )
    }

    return(
      <div id="show">
        <ComicDetails
          comic={this.state.comic}
        />
        <br /> <hr />
        {loadedComic}
        <br /> <hr />
        {this.props.children}
      </div>
    )
  }
}

export default ComicShowPage;
