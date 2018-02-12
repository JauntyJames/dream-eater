import React from 'react';

const ButtonGroup = (props) => {

  return(
    <div className="comic-nav">
      <button onClick={props.goToBegining}><i className="fas fa-angle-double-left"></i></button>
      <button onClick={props.goFull}><i className="fas fa-expand"></i></button>
      <button onClick={props.bookmarkPage}><i className="far fa-bookmark"></i></button>
      <button onClick={props.addFavorite}><i className="far fa-heart"></i></button>
      <button onClick={props.turnPageBack}><i className="fas fa-angle-left"></i></button>
      <button onClick={props.turnPageForward}><i className="fas fa-angle-right"></i></button>
    </div>
  )
}
export default ButtonGroup;
