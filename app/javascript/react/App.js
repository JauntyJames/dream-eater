import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import NavBar from './components/NavBar'
import ComicsIndexContainer from './containers/ComicsIndexContainer'
import ComicShowContainer from './containers/ComicShowContainer'
import NewComicContainer from './containers/NewComicContainer'

const App = (props) => {

  return(
    <Router history={browserHistory} >

      <Route path='/' component={NavBar} >
        <IndexRoute component={ComicsIndexContainer} />
        <Route path="/comics" component={ComicsIndexContainer} />
        <Route path="/comics/new" component={NewComicContainer} />
        <Route path="/comics/:id" component={ComicShowContainer} />
        <Route path="/sign_in" component={() => {
          window.location = '/users/sign_in'
        }} />
      </Route>

    </Router>
  )
}
export default App;
