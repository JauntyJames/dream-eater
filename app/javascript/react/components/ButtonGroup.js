import React from 'react';

const ButtonGroup = (props) => {

  return(
    <div>
      <button onClick={props.goToBegining}>&lt;&lt; Begining</button>
      <button onClick={props.turnPageBack}>&lt; Back</button>
      <button onClick={props.turnPageForward}>Forward &gt;</button>
      <button onClick={props.goFull}>Fullscreen</button>
      <button onClick={props.bookmarkPage}>Bookmark</button>
      <button onClick={props.addFavorite}>Add to Favorites</button>
    </div>
  )
}
export default ButtonGroup;
