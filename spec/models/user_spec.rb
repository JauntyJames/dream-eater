require 'rails_helper'

RSpec.describe User, type: :model do
  class Info
    attr_reader :email, :image
    def initialize(email, image)
      @email = email
      @image = image
    end
  end
  
  class Auth
    attr_reader :info, :provider, :uid
    def initialize(info, provider, uid)
      @info = Info.new(info[:email], info[:image])
      @provider = provider
      @uid = uid
    end
  end

  describe "#admin?" do
    it "is not an admin if the role is not admin" do
      user = FactoryBot.create(:user, role: "member")
      expect(user.admin?).to eq(false)
    end

    it "is an admin if the role is admin" do
      user = FactoryBot.create(:user, role: "admin")
      expect(user.admin?).to eq(true)
    end
  end

  describe "#from_omniauth" do
    it "associates a user with an omniauth account" do
      user_auth = Auth.new({email: "user@domain.com", image: "http://www.address.com"}, "facebook", 456234)
      user1 = User.from_omniauth( user_auth )
      expect(user1.provider).to eq "facebook"
    end
  end
end
