import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import NavBar from './components/NavBar'
import ComicDisplay from './containers/ComicDisplay'
import ComicsIndexContainer from './containers/ComicsIndexContainer'
import ComicShowPage from './containers/ComicShowPage'
import NewComicContainer from './containers/NewComicContainer'
import UserBookshelfContainer from './containers/UserBookshelfContainer'

const App = (props) => {

  return(
    <Router history={browserHistory} >

      <Route path='/' component={NavBar}>
        <IndexRoute component={ComicsIndexContainer} />
        <Route path="/comics" component={ComicsIndexContainer} />
        <Route path="/comics/new" component={NewComicContainer} />
        <Route path="/comics/:id" component={ComicShowPage} />
        <Route path="/comics/:id" component={ComicDisplay} />
        <Route path="/user/:id" component={UserBookshelfContainer} />
      </Route>

    </Router>
  )
}

export default App
