import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import Dropzone from 'react-dropzone'

import Uploader from './Uploader';
import ComicForm from '../components/ComicForm';
import MessageTile from '../components/MessageTile';
import ComicsIndexContainer from './ComicsIndexContainer'

class NewComicContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      title: "",
      author: "",
      description: "",
      publishedYear: "",
      messages: [],
      dropzoneActive: false
    }
    this.acceptFile = this.acceptFile.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handlePublishedYearChange = this.handlePublishedYearChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.onDragEnter = this.onDragEnter.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.redirect = this.redirect.bind(this)
    this.validateFields = this.validateFields.bind(this)
  }

  acceptFile(accepted) {
    this.setState({ file: accepted })
  }

  handleAuthorChange(event) {
    let value = event.target.value
    this.setState({ author: value })
  }

  handleDescriptionChange(event) {
    let value = event.target.value
    this.setState({ description: value })
  }

  handlePublishedYearChange(event) {
    let value = event.target.value
    this.setState({ publishedYear: value })
  }

  handleSubmit(event) {
    event.preventDefault();
    let errors = this.validateFields()
    if (errors.length > 0) {
      this.setState({ messages: errors })
    } else {
      let formPayload = new FormData()
      formPayload.append('title', this.state.title)
      formPayload.append('file', this.state.file[0], this.state.file.name)
      formPayload.append('author', this.state.author)
      formPayload.append('description', this.state.description)
      formPayload.append('published_year', this.state.publishedYear)
      this.submitForm(formPayload)
    }
  }

  handleTitleChange(event) {
    let value = event.target.value
    this.setState({ title: value })
  }

  onDragEnter() {
    console.log('enter');
    this.setState({ dropzoneActive: true })
  }

  onDragLeave() {
    console.log('leave');
    this.setState({ dropzoneActive: false })
  }

  onDrop(file) {
    this.setState({ file, dropzoneActive: false })
  }

  redirect(path) {
    this.props.router.push(path);
  }

  submitForm(formPayload) {
    fetch('/api/v1/comics', {
      credentials: "same-origin",
      method: "POST",
      body: formPayload
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
      this.redirect(body.path)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    this.setState({ messages: ["Comic uploading..."]})
  }

  validateFields() {
    let errors = []
    if (this.state.file.length === 0) {
      errors.push('Error: What\'s the point in uploading a comic without a comic?')
    }
    if (this.state.title === '') {
      errors.push('Error: Is this comic called something in particular?')
    }
    if (this.state.author === '') {
      errors.push('Error: Everything was made by somebody, my dude.')
    }
    if (!Number.isInteger(+this.state.publishedYear) || +this.state.publishedYear === 0) {
      errors.push('Error: I don\'t think think that\'s a real year')
    }
    return(errors)
  }

  render() {
    const { accept, file, dropzoneActive } = this.state;

    const overlayStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '2.5em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      color: '#fff'
    };

    let messageArray = this.state.messages.map((message) => {
      return(
        <MessageTile message={message} key={message} />
      )
    })

    let renderComponent

    if (file.length === 0) {
      renderComponent = [
        <Dropzone
          key="index"
          accept="application/pdf"
          disableClick={true}
          multiple={false}
          maxSize={8000000}
          style={{position: "relative"}}
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragOver={this.onDragLeave}
        >
          { dropzoneActive && <div style={overlayStyle}>Drop your comic PDF here</div> }
          <ComicsIndexContainer />
        </Dropzone>
      ]

    } else {
      renderComponent = [
        <form key="new">
          <ComicForm
            handleAuthorChange={this.handleAuthorChange}
            author={this.state.author}
            handleDescriptionChange={this.handleDescriptionChange}
            description={this.state.description}
            handlePublishedYearChange={this.handlePublishedYearChange}
            publishedYear={this.state.publishedYear}
            handleTitleChange={this.handleTitleChange}
            title={this.state.title}
          />
          <Uploader acceptFile={this.state.file}/><br/>
          {messageArray}
          <input className="button" type="submit" onClick={this.handleSubmit} ></input>
        </form>
      ]
    }

    return(
      <div>
        {renderComponent}
      </div>
    )
  }
}

export default NewComicContainer;
