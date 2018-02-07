import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/build/entry.webpack';
import Fullscreen from "react-full-screen";

import ButtonGroup from '../components/ButtonGroup'


class ComicDisplay extends Component {
  constructor(props){
    super(props);
    this.state = {
      isFull: false,
      numPages: null,
      rightPage: 1,
      leftPage: 0, //refactor to conditionally render the page instead of erroring out
      comic: this.props.comic,
      messages: [],
      bookmark: this.props.bookmark
    }
    this.addFavorite = this.addFavorite.bind(this)
    this.bookmarkPage = this.bookmarkPage.bind(this)
    this.goFull = this.goFull.bind(this)
    this.goToBegining = this.goToBegining.bind(this)
    this.onDocumentLoad = this.onDocumentLoad.bind(this)
    this.submitShelf = this.submitShelf.bind(this)
    this.turnPageBack = this.turnPageBack.bind(this)
    this.turnPageForward = this.turnPageForward.bind(this)
  }

  addFavorite() {
    debugger
    let formPayload = {
      shelf: {
        comic_id: this.state.comic.id,
        favorite: true
      }
    }
    this.submitShelf(formPayload)
  }

  bookmarkPage() {
    let formPayload = {
      shelf: {
        comic_id: this.state.comic.id,
        bookmark: this.state.rightPage
      }
    }
    this.submitShelf(formPayload)
  }

  goFull() {
    if (this.state.isFull){
      this.setState({ isFull: false })
    } else {
      this.setState({ isFull: true });
    }
  }

  goToBegining() {
    this.setState({ rightPage: 1, leftPage: 0 })
  }

  onDocumentLoad = ({ numPages }) => {
    let leftPage = 1
    let rightPage = 0
    if (this.state.bookmark && this.state.bookmark !== 1) {
      rightPage = this.state.bookmark
      leftPage = this.state.bookmark - 1
    }
    this.setState({ numPages, rightPage: rightPage, leftPage: leftPage });
  }

  submitShelf(formPayload) {
    fetch('/api/v1/shelves', {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      method: 'POST',
      body: JSON.stringify(formPayload)
    })
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
      let messages = this.state.messages.concat(body.message)
      this.setState({ messages: messages })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
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
    let comicFile
    if (this.state.comic.length !== 0 ) {
      comicFile = this.state.comic.url
    }
    const { rightPage, leftPage, numPages } = this.state;

    return (
      <div className="display-box large-12">

        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({isFull})}
        >
          <div className="full-screenable-node">
            <ButtonGroup
              key={"top"}
              goToBegining={this.goToBegining}
              turnPageBack={this.turnPageBack}
              turnPageForward={this.turnPageForward}
              goFull={this.goFull}
              bookmarkPage={this.bookmarkPage}
              addFavorite={this.addFavorite}
            />
            <Document
              className="comic-container row large-12"
              file={comicFile}
              onLoadSuccess={this.onDocumentLoad}
              ref={(input) => { this.focusDocument = input; }}
            >
              <Page className="large-6 comic" pageNumber={leftPage} width={500} />
              <Page className="large-6 comic" pageNumber={rightPage} width={500} />
            </Document>
            <p>Page {leftPage} of {numPages}</p>
            <ButtonGroup
              key={"bottom"}
              goToBegining={this.goToBegining}
              turnPageBack={this.turnPageBack}
              turnPageForward={this.turnPageForward}
              goFull={this.goFull}
              bookmarkPage={this.bookmarkPage}
              addFavorite={this.addFavorite}
            />
          </div>
        </Fullscreen>
      </div>
    );
  }
}

export default ComicDisplay;
