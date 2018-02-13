import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/build/entry.webpack';
import Fullscreen from 'react-full-screen';
import Hammer from 'react-hammerjs';

import ButtonGroup from '../components/ButtonGroup'
import MessageTile from '../components/MessageTile'


class ComicDisplay extends Component {
  constructor(props){
    super(props);
    this.state = {
      isFull: false,
      numPages: null,
      rightPage: 1,
      leftPage: 0,
      comic: this.props.comic,
      messages: [],
      bookmark: this.props.bookmark,
      scale: 500
    }
    this.addFavorite = this.addFavorite.bind(this)
    this.arrowKey = this.arrowKey.bind(this)
    this.bookmarkPage = this.bookmarkPage.bind(this)
    this.buttons = this.buttons.bind(this)
    this.goFull = this.goFull.bind(this)
    this.handlePan = this.handlePan.bind(this)
    this.handleZoom = this.handleZoom.bind(this)
    this.goToBegining = this.goToBegining.bind(this)
    this.onDocumentLoad = this.onDocumentLoad.bind(this)
    this.scroll = this.scroll.bind(this)
    this.submitShelf = this.submitShelf.bind(this)
    this.turnPageBack = this.turnPageBack.bind(this)
    this.turnPageForward = this.turnPageForward.bind(this)
  }

  addFavorite() {
    let formPayload = {
      shelf: {
        comic_id: this.state.comic.id,
        favorite: true
      }
    }
    this.submitShelf(formPayload)
  }

  arrowKey(event) {
    if (event.key === 'ArrowRight') {
      this.turnPageForward()
    } else if (event.key === 'ArrowLeft') {
      this.turnPageBack()
    }
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

  buttons(key) {
    return (
      <ButtonGroup
        key={key}
        goToBegining={this.goToBegining}
        turnPageBack={this.turnPageBack}
        turnPageForward={this.turnPageForward}
        goFull={this.goFull}
        bookmarkPage={this.bookmarkPage}
        addFavorite={this.addFavorite}
        zoom={this.handleZoom}
      />
    )
  }

  goFull() {
    this.setState({ isFull: !this.state.isFull, scale: 500 })
  }

  handlePan() {

  }

  handleZoom() {
    this.setState({ scale: 1.0 })
  }

  goToBegining() {
    this.setState({ rightPage: 1, leftPage: 0 })
  }

  onDocumentLoad = ({ numPages }) => {
    if (this.state.bookmark && this.state.bookmark !== 1) {
      let rightPage = this.state.bookmark
      let leftPage = this.state.bookmark - 1
      this.setState({ numPages, rightPage: rightPage, leftPage: leftPage });
    }
    this.setState({ numPages })
  }

  scroll(wheelEvent) {
    if (this.state.isFull) {
      if (wheelEvent.deltaY > 20){
        let newZoom = this.state.scale + 10
        this.setState({ scale: newZoom})
      } else if (wheelEvent.deltaY < -20 && this.state.scale > 200 ){
        let newZoom = this.state.scale - 10
        this.setState({ scale: newZoom})
      }
    }
    // else if (wheelEvent.deltaX > 40){
    //   this.turnPageForward();
    // } else if (wheelEvent.deltaX < -40) {
    //   this.turnPageBack();
    // }
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
      this.setState({ leftPage: newLeftPage, rightPage: newRightPage, messages: [] })
    }
  }

  turnPageForward() {
    if (this.state.rightPage < this.state.numPages) {
      let newLeftPage = this.state.leftPage + 2
      let newRightPage = this.state.rightPage + 2
      this.setState({ leftPage: newLeftPage, rightPage: newRightPage, messages: [] })
    }
  }

  render() {
    let comicFile
    if (this.state.comic.length !== 0 ) {
      comicFile = this.state.comic.url
    }
    const { rightPage, leftPage, numPages } = this.state;
    let messageTiles = this.state.messages.map((message) => {
      return (
        <MessageTile message={message} key={message}/>
      )
    })

    let pages = []
    if(this.state.leftPage > 0 && this.state.rightPage <= this.state.numPages){
      pages = [
        (<Page className="comic" pageNumber={leftPage} width={this.state.scale} key="left" onClick={this.turnPageBack}/>),
        (<Page className="comic" pageNumber={rightPage} width={this.state.scale} key="right" onClick={this.turnPageForward} />)
      ]
    } else if (this.state.leftPage === 0) {
      pages = [
        (<Page className="comic" pageNumber={rightPage} width={this.state.scale} key="right" onClick={this.turnPageForward} />)
      ]
    } else if (this.state.rightPage > this.state.numPages) {
      pages = [
        (<Page className="comic" pageNumber={leftPage} width={this.state.scale} key="left" onClick={this.turnPageBack}/>),
      ]
    }
    return (
      <div className="display-box large-12">
        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({isFull})}
        >
          <div className="full-screenable-node" onKeyDown={this.arrowKey} onWheel={this.scroll}>
            {this.buttons('top')}
            {messageTiles}
            <Hammer onPan={this.handlePan}>
              <Document
                className="comic-container row large-12"
                file={comicFile}
                onLoadSuccess={this.onDocumentLoad}
                ref={(input) => { this.focusDocument = input; }}
              >
                {pages}
              </Document>
            </Hammer>
            <p>Page {rightPage} of {numPages}</p>
            {this.buttons('bottom')}
          </div>
        </Fullscreen>
      </div>
    );
  }
}

export default ComicDisplay;
