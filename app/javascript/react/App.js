import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute, Redirect } from 'react-router';

import NavBar from './components/NavBar'
import ComicDisplay from './containers/ComicDisplay'
import ComicsIndexContainer from './containers/ComicsIndexContainer'
import ComicShowPage from './containers/ComicShowPage'
import NewComicContainer from './containers/NewComicContainer'
import UserBookshelfContainer from './containers/UserBookshelfContainer'
import ComicEditContainer from './containers/ComicEditContainer'
import CommentsContainer from './containers/CommentsContainer'

const App = (props) => {

  return(
    <Router history={browserHistory} >

      <Route path='/' component={NavBar} >
        <IndexRoute component={NewComicContainer} />
        <Route path="/comics" component={NewComicContainer} />
        <Route path="/comics/new" component={NewComicContainer} />
        <Route path="/comics/edit/:id" component={ComicEditContainer} />
        <Route path="/comics/:id" component={ComicShowPage} >
          <IndexRoute component={CommentsContainer} />
        </Route>
        <Route path="/user/:id" component={UserBookshelfContainer} />
      </Route>

    </Router>
  )
}

export default App
