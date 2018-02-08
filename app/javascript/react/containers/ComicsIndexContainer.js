import React, { Component } from 'react';
import FuzzySearch from 'react-fuzzy'

import ComicTile from '../components/ComicTile'

class ComicsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comics: [],
      selected: []
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    fetch('api/v1/comics',
        {credentials: 'same-origin'}
      )
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
      this.setState({ comics: body.comics })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  selectComics(selected) {
    let comicsArray = selected.map(comic => {
      return (
        <ComicTile
          title={comic.title}
          author={comic.author}
          thumb={comic.thumbnail}
        />
      )
    })
    return(comicsArray)
  }

  render() {
    const list =
      [{
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald'
      }, {
        id: 2,
        title: 'The DaVinci Code',
        author: 'Dan Brown'
      }, {
        id: 3,
        title: 'Angels & Demons',
        author: 'Dan Brown'
      }];

    return(
      <div>
        <FuzzySearch
          list={list}
          keys={['author', 'title']}
          width={430}
          onSelect={action('selected')}
        />
      </div>
    )
  }
}

export default ComicsIndexContainer;
