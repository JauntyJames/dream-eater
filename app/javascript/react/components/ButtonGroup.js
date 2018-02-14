import React from 'react';


const ButtonGroup = (props) => {
  let visibility
  if (props.navVisible){
    visibility = {visibility: 'visible'}
  } else{
    visibility = {visibility: 'hidden'}
  }

  return(
    <div className={`comic-nav`} id={props.id}>
      <button className="button round" onClick={props.goToBegining}><i className="fas fa-angle-double-left"></i></button>
      <button className="button round" onClick={props.goFull}><i className="fas fa-expand"></i></button>
      <button className="button round" onClick={props.bookmarkPage}><i className="far fa-bookmark"></i></button>
      <button className="button round" onClick={props.addFavorite}><i className="far fa-heart"></i></button>
      <button className="button round" onClick={props.turnPageBack}><i className="fas fa-angle-left"></i></button>
      <button className="button round" onClick={props.turnPageForward}><i className="fas fa-angle-right"></i></button>
    </div>
  )
}
export default ButtonGroup;
