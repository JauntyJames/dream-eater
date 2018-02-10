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
    // this.submitForm = this.submitForm.bind(this)
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handlePublishedYearChange = this.handlePublishedYearChange.bind(this)
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
      debugger
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

  handleDescriptionChange(event) {
    let value = event.target.value
    this.setState({ description: value })
  }

  handlePublishedYearChange(event) {
    let value = event.target.value
    this.setState({ publishedYear: value })
  }

  handleTitleChange(event) {
    let value = event.target.value
    this.setState({ title: value })
  }


  render() {

    return(
      <div>
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
      </div>
    )
  }
}

export default ComicEditContainer;
