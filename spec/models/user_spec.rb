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

  user_auth = Auth.new({email: "user@domain.com", image: "http://www.address.com"}, "facebook", 456234)
  let!(:user1) { User.from_omniauth( user_auth ) }
  let!(:user2) { FactoryBot.create(:user, role: "member") }
  let!(:user3) { FactoryBot.create(:user, role: "admin") }

  describe "#admin?" do
    it "is not an admin if the role is not admin" do
      expect(user2.admin?).to eq(false)
    end

    it "is an admin if the role is admin" do
      expect(user3.admin?).to eq(true)
    end
  end

  describe "#apply_omniauth" do
    it "updates a user with omniauth data" do
      user3.apply_omniauth(user_auth)
      expect(user3.provider).to eq "facebook"
    end
  end

  describe "#from_omniauth" do
    it "associates a user with an omniauth account" do
      expect(user1.provider).to eq "facebook"
    end
  end

  describe "#has_facebook_linked?" do
    it "returns true if created from omniauth" do
      expect(user1.has_facebook_linked?).to eq true
    end
    
    it "returns false if created not from omniauth" do
      expect(user2.has_facebook_linked?).to eq false
    end
  end
end
