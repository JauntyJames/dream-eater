import React, { Component } from 'react';
import ComicForm from '../components/ComicForm'

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
    this.submitForm = this.submitForm.bind(this)
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
    let formPayload = {
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      published_year: this.state.publishedYear
    }
    this.submitForm('PATCH', formPayload)
  }

  handlePublishedYearChange(event) {
    let value = event.target.value
    this.setState({ publishedYear: value })
  }

  handleTitleChange(event) {
    let value = event.target.value
    this.setState({ title: value })
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

    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {

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
          <input className="button" type="submit" onClick={this.handleEdit} value="Edit Comic"></input>
          <input className="button" type="submit" onClick={this.handleDelete} value="Delete Comic"></input>
      </form>
      </div>
    )
  }
}

export default ComicEditContainer;
