import React from 'react';
import { Link } from 'react-router';

import ComicShowContainer from '../containers/ComicShowContainer'

const ComicTile = (props) => {
  return(
    <div>
      <Link to={ComicShowContainer}>{props.title}</Link>
    </div>
  )
}
export default ComicTile;
