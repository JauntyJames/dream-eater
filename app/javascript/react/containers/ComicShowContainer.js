import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/build/entry.webpack';


class ComicShowContianer extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    comic: []
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
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}

export default ComicShowContianer;
