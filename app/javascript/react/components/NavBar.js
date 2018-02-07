import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
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
      this.setState({ signedIn: body.signed_in})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let newComic;
    if (this.state.signedIn){
      newComic = <Link to='comics/new'><button>Add Comic</button></Link>
    } else {
      newComic = <Link href='/users/sign_in'><button>Sign In</button></Link>
    }
    return(
      <div className="row column">
        <Link to='/'><button>Index</button></Link>
        <button onClick={browserHistory.goBack}>Back</button>
        {newComic}
        { this.props.children }
      </div>
    )
  }
}
export default NavBar;
