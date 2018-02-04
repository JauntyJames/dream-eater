import React from 'react';
import { Link, browserHistory } from 'react-router'

const NavBar = (props) => {

  return(
    <div>
      <Link to='/'><button>Index</button></Link>
      <button onClick={browserHistory.goBack}>Back</button>
      <Link to='comics/new'><button>Add Comic</button></Link>
      { props.children }
    </div>
  )
}
export default NavBar;
