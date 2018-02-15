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
      <div>
        <div id="navbar">
          <div className="large-6 small-12 thing">
            <ul className="headers">
              <li>
                <p id="title">DreamEater</p>
                <p>Comicbook Library</p>
              </li>
            </ul>
          </div>

          <div className="large-6 small-12 thing nav-buttons">
            <ul className="headers ">
              <li><Link to='/'><button>Index</button></Link></li>
              <li><button onClick={browserHistory.goBack} className="button">Back</button></li>
              <li>{myBookshelf}</li>
            </ul>
          </div>
        </div>
        <div id="children">
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default NavBar;

// {/* <div className="row column" id="navbar">
//   <div >
//     <h1 id="title">Dream Eater</h1>
//     <h3>Comicbook Library</h3>
//     <Link to='/'><button>Index</button></Link>
//     <button onClick={browserHistory.goBack}>Back</button>
//     {myBookshelf}
//   </div>
//   {this.props.children }
// </div> */}
