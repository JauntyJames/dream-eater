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
        <Route path="/comics/:id" component={ComicShowContainer} />
        <Route path="/comics/new" component={NewComicContainer} />
      </Route>
    </Router>
  )
}
export default App;
