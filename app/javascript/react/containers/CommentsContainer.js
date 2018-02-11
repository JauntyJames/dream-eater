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
    this.handleSubmit = this.handleSubmit.bind(this)
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
      this.setState({ comments: body })
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
        body: this.state.body,
        comic_id: this.props.params.id
      }
    }

    fetch('/api/v1/comments', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
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
      comments = this.state.comments.concat(body)
      this.setState({ comments: comments })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let commentArray = this.state.comments.map((comment) => {
      return(
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
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default CommentsContainer;
