require 'rails_helper'

RSpec.describe Api::V1::ShelvesController, type: :controller do
  let!(:user1) {FactoryBot.create(:user)}
  let!(:user2) {FactoryBot.create(:user)}
  let!(:comic1) {FactoryBot.create(:comic)}

  describe "POST#create" do
    it "should shelve a favorited comic" do
      sign_in(user1, scope: :user)
      post :create, params: { shelf: { comic_id: comic1.id, favorite: true } }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(returned_json["shelf"]["user_id"]).to eq user1.id
      expect(returned_json["message"]).to eq "Comic added to your favorites!"
    end

    it "should shelve a bookmarked comic" do
      sign_in(user1, scope: :user)
      post :create, params: { shelf: { comic_id: comic1.id, bookmark: 12 } }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(returned_json["shelf"]["user_id"]).to eq user1.id
      expect(returned_json["message"]).to eq "Bookmark created."
    end

    it "should add a bookmark to an existing shelf" do
      sign_in(user1, scope: :user)
      post :create, params: { shelf: { comic_id: comic1.id, favorite: true } }
      post :create, params: { shelf: { comic_id: comic1.id, bookmark: 12 } }
      expect(response.status).to eq 200
      expect(Shelf.first.favorite).to eq true
      expect(Shelf.first.bookmark).to eq 12
      returned_json = JSON.parse(response.body)
      expect(returned_json["message"]).to eq "Bookmark created."
    end
    
    it "should not shelve a comic if not logged in" do
      post :create, params: { shelf: { comic_id: comic1.id, favorite: true } }

      expect(response.status).to eq 302
    end

  end
end
