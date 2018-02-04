import React from 'react';
import { Link } from 'react-router';


const ComicTile = (props) => {
  return(
    <div>
      <Link to={`/comics/${props.id}`}>
      <img src={props.thumb.url} />
      {props.title}</Link>
    </div>
  )
}
export default ComicTile;
