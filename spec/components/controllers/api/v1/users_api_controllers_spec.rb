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
      sign_in :user, user1
      get :show, params: { id: user1.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
      expect(returned_json["user"]["email"]).to eq user1.email
      expect(returned_json["favorites"][0]["comic_id"]).to eq comic1.id
    end

    xit "does not users to access someone else's profile" do
      sign_in :user, user2
      get :show, params: { id: user1.id }

      expect(response.status).to eq 401
    end

    xit "does not allow users to access a profile without logging in" do
      get :show, params: { id: user1.id }

      expect(response.status).to eq 401
    end
  end

end
