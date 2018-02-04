RSpec.describe Comic, type: :model do
  describe "validations" do
    it { should have_valid(:title).when("Uzumaki") }
    it { should have_valid(:author).when("Junji Ito") }
    xit { should have_valid(:file).when("uzumaki.pdf") } # need to figure out how to validate this

    it { should_not have_valid(:published_year).when(Date.today.year + 5) }
    it { should_not have_valid(:file).when("butts.blueberry") }
  end
end
