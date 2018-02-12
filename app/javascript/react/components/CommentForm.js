import React from 'react';

const CommentForm = (props) => {
  let buttonText = "Submit Comment"
  if (props.edit){
    buttonText = "Update Comment"
  }
  return(
    <div>
      <form id="large-8">
        <label id="body"></label>
        <input
          type="text"
          name="body"
          value={props.body}
          onChange={props.handleBodyChange}
          id="comment-body"
        />
        <input
          type="submit"
          value={buttonText}
          className="button"
          onClick={props.handleSubmit}
        />
      </form>
    </div>
  )
}
export default CommentForm;
