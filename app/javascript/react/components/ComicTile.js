import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/build/entry.webpack';


class ComicTile extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    file: null
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
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

export default ComicTile;
