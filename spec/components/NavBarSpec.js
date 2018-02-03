import NavBar from '../../app/javascript/react/components/NavBar'

describe('Navbar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <NavBar />
    )
  });

  it('should render a div tag', () => {
    expect(wrapper.find('div')).toBePresent();
  })

  it('should render a link', () => {
    expect(wrapper.find('Link')).toBePresent();
    expect(wrapper.find('Link').text()).toEqual('Index');
  })

  it('should render a button', () => {
    expect(wrapper.find('button')).toBePresent();
    expect(wrapper.find('button').last().text()).toEqual('Back');
  })
})
