import React from 'react';

const CommentTile = (props) => {
  let user = props.comment.user
  let date = new Date(props.comment.created_at)
  let edited
  let edit
  let deleteable
  if (props.comment.created_at !== props.comment.updated_at){
    edited = "edited"
  }
  if (props.comment.editable) {
    edit = "edit comment / "
    deleteable = "delete comment"
  }
  const MonthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  let month = MonthNames[date.getMonth()]
  let day = date.getDate()

  let editComment = () => {
    let body = props.comment.body
    let id = props.comment.id
    props.handleEdit(id, body)
  }

  let deleteComment = () => {
    props.handleDelete(props.comment.id)
  }


  return(
    <div className="media-object large-8">
      <div className="media-object-section">
        <div className="thumbnail">
          <img src={user.profile_photo.url} width="75" />
        </div>
      </div>
      <div className="media-object-section">
        <ul className="menu">
          <li>{user.email + "  - "}</li>
          <li>{month + " " + day + " "}</li>
          <li><i>{edited}</i></li>
        </ul>
        <p>{props.comment.body}</p>
        <ul className="menu">
          <li onClick={editComment}>{edit}</li>
          <li onClick={deleteComment}>{deleteable}</li>
        </ul>
      </div>
    </div>
  )
}
export default CommentTile;
