import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/build/entry.webpack';

import File from "users/jameshartman/launch/breakable-toy/01-Immolation/01\ Petrichor\ COVER\ FINAL.pdf"

class ComicTile extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Document
          file="somefile.pdf"
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
