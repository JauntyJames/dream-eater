import React, { Component } from 'react';

import CommentTile from '../components/CommentTile';
import CommentForm from '../components/CommentForm';

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      body: ""
    }
    this.handleBodyChange = this.handleBodyChange.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/comments/${this.props.params.id}`, {
      credentials: 'same-origin'
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
      this.setState({ comments: body.comments })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleBodyChange(event) {
    let value = event.target.value
    this.setState({ body: value })
  }

  handleSubmit(event) {
    event.preventDefault()
    let formPayload = {
      comment: {
        body: this.state.body
      }
    }

    fetch('url')
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
    let commentArray = this.state.comments.map((comment) => {
      render(
        <CommentTile
          body={comment.body}
        />
      )
    })

    return(
      <div>
        {commentArray}
        <CommentForm
          body={this.state.body}
          handleBodyChange={this.handleBodyChange}
        />
      </div>
    )
  }
}

export default CommentsContainer;
