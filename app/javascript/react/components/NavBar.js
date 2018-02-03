import React from 'react';
import { Link, browserHistory } from 'react-router'

const NavBar = (props) => {

  return(
    <div>
      <button><Link to='/'>Index</Link></button>
      <button onClick={browserHistory.goBack}>Back</button>
      { props.children }
    </div>
  )
}
export default NavBar;
