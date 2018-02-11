require 'rails_helper'

RSpec.describe User, type: :model do
  xdescribe 'validations' do
    it { should have_valid(:user_name).when('NewUserName') }

    it { should_not have_valid(:user_name).when("") }

    it 'should fail for duplicate user name' do
      user = FactoryBot.create(:user, role: "admin")
      should_not have_valid(:user_name).when(user.user_name)
    end
  end
end
