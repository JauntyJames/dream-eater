import React from 'react';

const CommentTile = (props) => {
  let user = props.comment.user
  let date = new Date(props.comment.created_at)
  let edited = ""
  if (props.comment.created_at !== props.comment.updated_at){
    edited = "edited"
  }
  const MonthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  let month = MonthNames[date.getMonth()]
  let day = date.getDate()


  return(
    <div className="media-object">
      <div className="media-object-section">
        <div className="thumbnail">
          <img src={user.profile_photo.url} width="75" />
        </div>
      </div>
      <div className="media-object-section">
        <ul className="menu right">
          <li>{user.email + "  - "}</li>
          <li>{month + " " + day}</li>
        </ul>
        <p>{props.comment.body}</p>
      </div>
    </div>
  )
}
export default CommentTile;
