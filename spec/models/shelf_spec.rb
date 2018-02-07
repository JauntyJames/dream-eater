RSpec.describe Shelf, type: :model do
  describe 'validations' do
    it { should have_valid(:bookmark).when 22 }

    it { should_not have_valid(:bookmark).when -3 }
  end
end
