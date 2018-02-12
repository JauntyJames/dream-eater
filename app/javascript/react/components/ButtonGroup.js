import React from 'react';

const ButtonGroup = (props) => {

  return(
    <div className="comic-nav">
      <button onClick={props.goToBegining}>&lt;&lt; &lt;&lt;</button>
      <button onClick={props.turnPageBack}>&lt;&lt;</button>
      <button onClick={props.turnPageForward}>&gt;&gt;</button>
      <button onClick={props.goFull}>Fullscreen</button>
      <button onClick={props.bookmarkPage}>Bookmark</button>
      <button onClick={props.addFavorite}>Add to Favorites</button>
    </div>
  )
}
export default ButtonGroup;
