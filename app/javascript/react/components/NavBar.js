import React from 'react';

const NavBar = (props) => {

  return(
    <div>
      hey I'm a menu bar
      { props.children }
    </div>
  )
}
export default NavBar;
