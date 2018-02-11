RSpec.describe Comic, type: :model do
  describe "validations" do
    it { should have_valid(:title).when("Uzumaki") }
    it { should have_valid(:author).when("Junji Ito") }

    it { should_not have_valid(:published_year).when(Date.today.year + 5) }
    it { should_not have_valid(:file).when("butts.blueberry") }
  end
end
