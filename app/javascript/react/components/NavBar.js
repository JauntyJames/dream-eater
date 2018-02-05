import React from 'react';
import { Link, browserHistory } from 'react-router'

const NavBar = (props) => {
  let newComic;
  if (!props.route.signedIn){
    newComic = <Link to='/sign-in'><button>Sign In</button></Link>
  } else {
    newComic = <Link to='comics/new'><button>Add Comic</button></Link>
  }
  return(
    <div>
      <Link to='/'><button>Index</button></Link>
      <button onClick={browserHistory.goBack}>Back</button>
      {newComic}
      { props.children }
    </div>
  )
}
export default NavBar;
