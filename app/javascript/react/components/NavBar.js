import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      user: null
    }
  }

  componentWillMount() {
    fetch('/auth/is_signed_in', {credentials: 'same-origin'})
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ signedIn: body.signed_in, user: body.user})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let myBookshelf;
    if (this.state.signedIn){
      myBookshelf = <Link to={`/user/${this.state.user.id}`}><button>My Bookshelf</button></Link>
    } else {
      myBookshelf = <Link href='/users/sign_in'><button>Sign In</button></Link>
    }
    return(
      <div className="row column">
        <div id="navbar">
          <h1 id="title">Dream Eater</h1>
          <h3>Comicbook Library</h3>
          <Link to='/'><button>Index</button></Link>
          <button onClick={browserHistory.goBack}>Back</button>
          {myBookshelf}
        </div>
        {this.props.children }
      </div>
    )
  }
}
export default NavBar;
