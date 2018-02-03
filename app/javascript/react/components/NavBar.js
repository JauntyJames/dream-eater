import React from 'react';
import { Link, browserHistory } from 'react-router'

const NavBar = (props) => {

  return(
    <div>
      <button><Link to='/comics'>Index</Link></button>
      <button onClick={browserHistory.goBack}>Back</button>
      <button><Link to='comics/new'>Add Comic</Link></button>
      { props.children }
    </div>
  )
}
export default NavBar;
