import React from 'react';

const CommentTile = (props) => {
  return(
    <div className="media-object">
      <div className="media-object-section">
        <div className="thumbnail">
          <img src="" />
        </div>
      </div>
      <div className="media-object-section">
        <h4>Dreams feel real while we're in them.</h4>
        <p>{props.body}</p>
      </div>
    </div>
  )
}
export default CommentTile;
