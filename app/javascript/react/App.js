import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import NavBar from './components/NavBar'
import ComicsIndexContainer from './containers/ComicsIndexContainer'
import ComicShowContainer from './containers/ComicShowContainer'

const App = (props) => {

  return(
    <Router history={browserHistory} >
      <Route path='/' component={NavBar} >
        <IndexRoute component={ComicsIndexContainer} />
        <Route path="/comics" component={ComicsIndexContainer} />
        <Route path="/comics/:id" component={ComicShowContainer} />
      </Route>
    </Router>
  )
}
export default App;
