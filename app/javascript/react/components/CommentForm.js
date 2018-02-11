import React from 'react';

const CommentForm = (props) => {

  return(
    <div>
      <form>
        <label id="body"></label>
        <input
          type="text"
          name="body"
          value={props.body}
          onChange={props.handleBodyChange}
        />
        <input
          type="submit"
          value="Submit Comment"
          className="button"
          onSubmit={props.handleSubmit}
        />
      </form>
    </div>
  )
}
export default CommentForm;
