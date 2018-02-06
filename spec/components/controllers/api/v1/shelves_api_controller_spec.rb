require 'rails_helper'

RSpec.describe Api::V1::ShelvesController, type: :controller do
  let!(:user1) {FactoryBot.create(:user)}
  let!(:user2) {FactoryBot.create(:user)}
  let!(:comic1) {FactoryBot.create(:comic)}

  describe "POST#create" do
    it "should shelve a favorited comic" do
      sign_in(user1, scope: :user)
      post :create, params: { comic_id: comic1.id, favorite: true }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(returned_json["shelf"]["user_id"]).to eq user1.id.to_s
      expect(returned_json["message"]).to eq "Comic added to your favorites!"
    end
  end
end
