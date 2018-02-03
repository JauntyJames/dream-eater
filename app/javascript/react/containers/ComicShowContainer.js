import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/build/entry.webpack';


class ComicShowContianer extends Component {
  constructor(props){
    super(props);
    this.state = {
      numPages: null,
      rightPage: 1,
      leftPage: 0, //refactor to conditionally render the page instead of erroring out
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
    if (this.state.leftPage > 1){
      let newLeftPage = this.state.leftPage - 2
      let newRightPage = this.state.rightPage - 2
      this.setState({ leftPage: newLeftPage, rightPage: newRightPage })
    }
  }

  turnPageForward() {
    if (this.state.leftPage < this.state.numPages) {
      let newLeftPage = this.state.leftPage + 2
      let newRightPage = this.state.rightPage + 2
      this.setState({ leftPage: newLeftPage, rightPage: newRightPage })
    }
  }

  render() {
    const { rightPage, leftPage, numPages } = this.state;

    return (
      <div>
        <button onClick={this.turnPageBack}>Back</button>
        <button onClick={this.turnPageForward}>Forward</button>
        <Document
          className="comic-container"
          file={this.state.comic.path}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page className="comic" pageNumber={leftPage} />
          <Page className="comic" pageNumber={rightPage} />
        </Document>
        <button onClick={this.turnPageBack}>Back</button>
        <button onClick={this.turnPageForward}>Forward</button>
        <p>Page {leftPage} of {numPages}</p>
      </div>
    );
  }
}

export default ComicShowContianer;
