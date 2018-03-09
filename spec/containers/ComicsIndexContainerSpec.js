import ComicsIndexContainer from  '../../app/javascript/react/containers/ComicsIndexContainer'
import ComicTile from '../../app/javascript/react/components/ComicTile'

import fetch from 'isomorphic-fetch'

describe('ComicsIndexContainer', () => {
  let wrapper, onClick;


  beforeEach(() => {
    onClick = jasmine.createSpy('onClick spy');
    wrapper = mount(
      <ComicsIndexContainer
        toggleForm={onClick}
      />
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

  it('Should render a seach bar', () => {
    expect(wrapper.find('input').at(0).props()).toEqual({
      id: "search",
      type: 'text',
      value: '',
      placeholder: 'Enter search terms',
      onChange: jasmine.any(Function)
    })
  })

  it('should render an upload button if logged in', () => {
    console.log(wrapper.debug())
    expect(wrapper.find('button').at(0).text()).toEqual("Upload New Comic");
  });

  it('Should fetch comic data and save it to state', () => {
    let data = {
      comics: [
        {name: 'The Unbeatable Squirrel Girl', description: 'A description'},
        {name: 'Saga', description: 'A description'}
      ],
      search: ''
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
//    expect(wrapper.state()).toEqual(data)

    expect(wrapper.spy)
    spyOn(ComicsIndexContainer.prototype, 'componentDidMount').and.callThrough()
    expect(ComicsIndexContainer.prototype.componentDidMount).toHaveBeenCalled
  })

})
