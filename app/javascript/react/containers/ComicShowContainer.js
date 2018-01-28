import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/build/entry.webpack';


class ComicShowContianer extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    file: null
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  componentDidMount() {
    fetch(`api/v1/comics/${this.props.params.id}`)

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

    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Document
          file="/../../assets/images/01-immolation.pdf"
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
