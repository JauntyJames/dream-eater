import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/build/entry.webpack';


class ComicShowContianer extends Component {
  constructor(props){
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      comic: []
    }
    this.turnPageBack = this.turnPageBack.bind(this)
    this.turnPageForward = this.turnPageForward.bind(this)
  }

  componentDidMount() {
    let id = this.props.params.id
    fetch(`/api/v1/comics/${id}`)
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
      this.setState({ comic: body.comic })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  turnPageBack() {
    if (this.state.pageNumber > 1){
      let newPage = this.state.pageNumber - 1
      this.setState({ pageNumber: newPage })
    }
  }

  turnPageForward() {
    if (this.state.pageNumber < this.state.numPages) {
      let newPage = this.state.pageNumber + 1
      this.setState({ pageNumber: newPage })
    }
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Document
          file={this.state.comic.path}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <button onClick={this.turnPageBack}>Back</button>
        <button onClick={this.turnPageForward}>Forward</button>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}

export default ComicShowContianer;
