
import React, { Component } from 'react';

import ComicTile from '../components/ComicTile'

class ComicsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return(
      <div>
        <ComicTile />
      </div>
    )
  }
}

export default ComicsIndexContainer;
