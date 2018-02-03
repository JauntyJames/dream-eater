import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/build/entry.webpack';
import Fullscreen from "react-full-screen";

class ComicShowContianer extends Component {
  constructor(props){
    super(props);
    this.state = {
      isFull: false,
      numPages: null,
      rightPage: 1,
      leftPage: 0, //refactor to conditionally render the page instead of erroring out
      comic: []
    }
    this.turnPageBack = this.turnPageBack.bind(this)
    this.turnPageForward = this.turnPageForward.bind(this)
    this.goFull = this.goFull.bind(this)
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

  goFull() {
    if (this.state.isFull){
      this.setState({ isFull: false})
    } else {
      this.setState({ isFull: true });
    }
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
    let navButtons = () => {
      return(
      <div>
        <button onClick={this.turnPageBack}>Back</button>
        <button onClick={this.turnPageForward}>Forward</button>
        <button onClick={this.goFull}>Fullscreen</button>
      </div>
    )}

    return (
      <div>

        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({isFull})}
        >
        <div className="full-screenable-node">
          {navButtons()}
          <Document
            className="comic-container"
            file={this.state.comic.path}
            onLoadSuccess={this.onDocumentLoad}
            >
              <Page className="comic" pageNumber={leftPage} />
              <Page className="comic" pageNumber={rightPage} />
            </Document>
            <p>Page {leftPage} of {numPages}</p>
            {navButtons()}
        </div>
        </Fullscreen>
      </div>
    );
  }
}

export default ComicShowContianer;
