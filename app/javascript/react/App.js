import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import NavBar from './components/NavBar'
import ComicsIndexContainer from './containers/ComicsIndexContainer'
import ComicShowContainer from './containers/ComicShowContainer'
import NewComicContainer from './containers/NewComicContainer'
import SignInContainer from './containers/SignInContainer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    }
  }

  componentWillMount() {
    fetch('/auth/is_signed_in')
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
    return(
      <Routes signedIn={this.state.signedIn}/>
    )
  }
}

const Routes = (props) => {
  return(
    <Router history={browserHistory} signedIn={props.signedIn}>

      <Route path='/' component={NavBar} signedIn={props.signedIn} >
        <IndexRoute component={ComicsIndexContainer} />
        <Route path="/sign-in" component={SignInContainer} />
        <Route path="/comics" component={ComicsIndexContainer} />
        <Route path="/comics/new" component={NewComicContainer} />
        <Route path="/comics/:id" component={ComicShowContainer} />
      </Route>

    </Router>
  )
}

export default App;
