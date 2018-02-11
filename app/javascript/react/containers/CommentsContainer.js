import React, { Component } from 'react';

import CommentTile from '../components/CommentTile';
import CommentForm from '../components/CommentForm';

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      body: "",
      edit: null
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/comics/${this.props.params.id}/comments`, {
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

  handleDelete(id) {

  }

  handleEdit(id, body) {
    this.setState({ edit: id, body: body })
  }

  handleSubmit(event) {
    event.preventDefault()
    let formPayload = {
      comment: {
        body: this.state.body,
        comic_id: this.props.params.id
      }
    }

    let method = 'POST'
    let commentId;

    if (this.state.edit) {
      method = 'PATCH'
      commentId= `/${this.state.edit}`
    }

    fetch(`/api/v1/comics/${this.props.params.id}/comments${commentId}`, {
      credentials: 'same-origin',
      method: method,
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
      comments = this.state.comments.concat(body.comments)
      this.setState({ comments: comments })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let commentArray = this.state.comments.map((comment) => {
      return(
        <CommentTile
          comment={comment}
          key={comment.id}
          handleEdit={this.handleEdit}
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
          edit={this.state.edit}
        />
      </div>
    )
  }
}

export default CommentsContainer;
