import ComicsIndexContainer from  '../../app/javascript/react/containers/ComicsIndexContainer'
import ComicTile from '../../app/javascript/react/components/ComicTile'

import fetch from 'isomorphic-fetch'

describe('ComicsIndexContainer', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <ComicsIndexContainer />
    )
  })
  it('should render comic components with the given state', () => {
    wrapper.setState({
      comics: [
        {title: 'The Unbeatable Squirrel Girl', file: {thumb: "www.website.com"}},
        {title: 'Saga', file: {thumb: "www.website.com"}},

      ]
    });
    expect(wrapper.find(ComicTile).at(0).props().title).toEqual('The Unbeatable Squirrel Girl')
    expect(wrapper.find(ComicTile).at(1).props().title).toEqual('Saga')
  })

  xit('Should fetch comic data and save it to state', () => {
    let data = {
      comics: [
        {name: 'The Unbeatable Squirrel Girl', description: 'A description'},
        {name: 'Saga', description: 'A description'}
      ]
    }

    let responseBody = JSON.stringify(data);
    let response = new Response(responseBody, {
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json' }
    });
    let responsePromise = Promise.resolve(response);

    spyOn(global, 'fetch').and.returnValue(responsePromise);
    expect(global.fetch).toHaveBeenCalled
    wrapper.instance().forceUpdate();
    expect(wrapper.state()).toEqual(data)
    expect(wrapper.spy)
    spyOn(ComicsIndexContainer, 'componentDidMount')
    expect(ComicsIndexContainer.componentDidMount).toHaveBeenCalled
  })

})
