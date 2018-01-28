import ComicTile from '../../app/javascript/react/components/ComicTile'
// app/javascript/react/components/ComicTile.js
describe('ComicTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ComicTile
      />
    )
  })

  it('should render a div tag', () => {
    expect(wrapper.find('div')).toBePresent();
  })

  it('should render a link', () => {
    expect(wrapper.find('Link')).toBePresent();
  })

})
