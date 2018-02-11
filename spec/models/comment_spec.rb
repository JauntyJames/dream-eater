require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'validations' do
    it {should have_valid(:body).when "What a great comic!"}
    it {should_not have_valid(:body).when ""}
  end
end
