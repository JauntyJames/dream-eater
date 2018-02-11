import React from 'react';

const CommentTile = (props) => {
  let user = props.comment.user
  return(
    <div className="media-object">
      <div className="media-object-section">
        <div className="thumbnail">
          <img src={user.profile_photo.url} />
        </div>
      </div>
      <div className="media-object-section">
        <p>{props.comment.body}</p>
      </div>
    </div>
  )
}
export default CommentTile;
