require "rails_helper"

RSpec.describe AuthController, type: :controller do
  let!(:user1) {FactoryBot.create(:user)}
  let!(:user2) {FactoryBot.create(:user, provider: "Facebook", uid: 12345)}

  describe "GET#is_signed_in?" do
    it "returns user info" do
      sign_in(user1, scope: :user)
      get :is_signed_in?
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(returned_json["signed_in"]).to eq true
      expect(returned_json["user"]["id"]).to eq user1.id
    end

    it "returns false if no user signed in" do
      get :is_signed_in?
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(returned_json["signed_in"]).to eq false
    end
  end
end
