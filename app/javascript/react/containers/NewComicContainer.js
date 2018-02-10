import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';

import Uploader from './Uploader';
import ComicForm from '../components/ComicForm';
import MessageTile from '../components/MessageTile';

class NewComicContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      title: "",
      author: "",
      description: "",
      publishedYear: "",
      messages: []
    }
    this.acceptFile = this.acceptFile.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handlePublishedYearChange = this.handlePublishedYearChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
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
    let messageArray = this.state.messages.map((message) => {
      return(
        <MessageTile message={message} key={message} />
      )
    })

    return(
      <div>
        <form>
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
          <Uploader acceptFile={this.acceptFile}/><br/>
          {messageArray}
          <input className="button" type="submit" onClick={this.handleSubmit} ></input>
        </form>
      </div>
    )
  }
}

export default NewComicContainer;
