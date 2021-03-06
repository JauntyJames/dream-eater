require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  let!(:user1) {FactoryBot.create(:user)}
  let!(:user2) {FactoryBot.create(:user)}
  let!(:comic1) {FactoryBot.create(:comic)}
  let!(:shelf1) {FactoryBot.create(
                                    :shelf,
                                    user_id: user1.id,
                                    comic_id: comic1.id,
                                    favorite: true
                                  )}

  describe "GET#show" do
    it "allows a user to access their profile" do
      sign_in(user1, scope: :user)
      get :show, params: { id: user1.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
      expect(returned_json["user"]["email"]).to eq user1.email
      expect(returned_json["user"]["favorites"][0]["id"]).to eq comic1.id
    end

    it "does not users to access someone else's profile" do
      sign_in(user2, scope: :user)
      get :show, params: { id: user1.id }

      expect(response.status).to eq 401
    end

    it "does not allow users to access a profile without logging in" do
      get :show, params: { id: user1.id }

      expect(response.status).to eq 302
    end
  end

end
