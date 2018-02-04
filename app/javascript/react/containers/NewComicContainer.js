import React, { Component } from 'react';

import Uploader from './Uploader'
import ComicForm from '../components/ComicForm'

class NewComicContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      title: "",
      author: "",
      description: "",
      publishedYear: ""
    }
    this.acceptFile = this.acceptFile.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handlePublishedYearChange = this.handlePublishedYearChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
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
// formData.append('userpic', myFileInput.files[0], 'chris.jpg');
  handleSubmit(event) {
    event.preventDefault();
    let formPayload = new FormData()
    formPayload.append('title', this.state.title)
    formPayload.append('file', this.state.file[0], this.state.file.name)
    formPayload.append('author', this.state.author)
    formPayload.append('description', this.state.description)
    formPayload.append('published_year', this.state.publishedYear)
    this.submitForm(formPayload)
  }

  handleTitleChange(event) {
    let value = event.target.value
    this.setState({ title: value })
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
          <Uploader acceptFile={this.acceptFile}/>
          <input type="submit" onClick={this.handleSubmit} ></input>
        </form>
      </div>
    )
  }
}

export default NewComicContainer;
