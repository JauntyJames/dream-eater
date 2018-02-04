import ComicTile from '../../app/javascript/react/components/ComicTile'

describe('ComicTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ComicTile
        thumb={{thumb: "www.website.com"}}
      />
    )
  })

  it('should render an img tag', () => {
    console.log(wrapper.debug());
    expect(wrapper.find('img')).toBePresent();
  })

  it('should render a link', () => {
    expect(wrapper.find('Link')).toBePresent();
  })

})
