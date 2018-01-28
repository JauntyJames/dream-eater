import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/build/entry.webpack';


class ComicShowContianer extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    file: null
  }

  componentDidMount() {
    fetch(`api/v1/comics/${this.props.params.id}`)
    .then(response => {
      if (response.ok) {
        debugger
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      debugger
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
          file='http://cdn.mozilla.net/pdfjs/helloworld.pdf'
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
