import React, { Component } from 'react';
import { Router } from 'react-router';

import ComicForm from '../components/ComicForm';

class ComicEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      description: "",
      publishedYear: "",
      messages: []
    }
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handlePublishedYearChange = this.handlePublishedYearChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.redirect = this.redirect.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.validateFields = this.validateFields.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/comics/${this.props.params.id}`, {
        credentials: 'same-origin',
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
      this.setState({
        title: body.comic.title,
        author: body.comic.author,
        description: body.comic.description,
        publishedYear: body.comic.published_year
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleAuthorChange(event) {
    let value = event.target.value
    this.setState({ author: value })
  }

  handleDelete(event) {
    event.preventDefault();
    this.submitForm('DELETE', {})
  }

  handleDescriptionChange(event) {
    let value = event.target.value
    this.setState({ description: value })
  }

  handleEdit(event) {
    event.preventDefault();
    let errors = this.validateFields()
    if (errors.length > 0) {
      this.setState({ messages: errors })
    } else {
      let formPayload = {
        title: this.state.title,
        author: this.state.author,
        description: this.state.description,
        published_year: this.state.publishedYear
      }
      this.submitForm('PATCH', formPayload)
    }
  }

  handlePublishedYearChange(event) {
    let value = event.target.value
    this.setState({ publishedYear: value })
  }

  handleTitleChange(event) {
    let value = event.target.value
    this.setState({ title: value })
  }

  redirect(path) {
    this.props.router.push(path);
  }

  submitForm(method, formPayload) {
    fetch(`/api/v1/comics/${this.props.params.id}`, {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      method: method,
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
      this.redirect(body.path)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  validateFields() {
    let errors = []
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
      return (
        <MessageTile message={message} key={message} />
      )
    })

    return(
      <div className="row">
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
          {messageArray}
          <input className="button" type="submit" onClick={this.handleEdit} value="Edit Comic"></input>
          <input className="button" type="submit" onClick={this.handleDelete} value="Delete Comic"></input>
        </form>
      </div>
    )
  }
}

export default ComicEditContainer;
