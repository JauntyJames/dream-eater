import React from 'react';
import { Link } from 'react-router';


const ComicTile = (props) => {
  return(
    <div className="callout large-3 shadow-drop-br">
      <Link to={`/comics/${props.id}`}>
      <img src={props.thumb} /><br/>
      {props.title}</Link>
    </div>
  )
}
export default ComicTile;
