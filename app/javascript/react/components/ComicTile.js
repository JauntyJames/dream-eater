import React from 'react';
import { Link } from 'react-router';

import ComicShowContainer from '../containers/ComicShowContainer'

const ComicTile = (props) => {
  return(
    <Link to={ComicShowContainer}>{props.title}</Link>
  )
}
export default ComicTile;
