require 'rails_helper'

RSpec.describe Api::V1::CommentsController, type: :controller do
  let!(:user1) {FactoryBot.create(:user)}
  let!(:user2) {FactoryBot.create(:user)}
  let!(:comic1) {FactoryBot.create(:comic)}
  let!(:comic2) {FactoryBot.create(:comic)}
  let!(:comment1) {FactoryBot.create(:comment, user: user1, comic: comic1)}
  let!(:comment2) {FactoryBot.create(:comment, user: user1, comic: comic1)}
  let!(:comment3) {FactoryBot.create(:comment, user: user1, comic: comic2)}

  describe "GET#index" do
    it "should return a list of comments for a comic" do
      get :index, params: { comic_id: comic1.id }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(returned_json["comments"].length).to eq 2
      expect(returned_json["comments"][0]["body"]).to eq comment1.body
      expect(returned_json["comments"].last["comic_id"]).to_not eq comment3.comic_id
    end
  end

  describe "POST#create" do
    it "should post a new comic" do
      sign_in(user1, scope: :user)
      post :create, params: {
        comic_id: comic1.id,
        comment: {comic_id: comic1.id, body: "I like comics!"
          }}
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(returned_json["comment"]["body"]).to eq "I like comics!"
    end

    it "should not post if a user is not signed in" do
      post :create, params: {
        comic_id: comic1.id,
        comment: {comic_id: comic1.id, body: "I like comics!"
          }}
      expect(response.status).to eq 302
    end

    it "should not post with an empty body " do
      sign_in(user1, scope: :user)
      post :create, params: {
        comic_id: comic1.id,
        comment: {comic_id: comic1.id, body: ""
          }}
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 422
      expect(returned_json["messages"][0]).to eq "Body can't be blank"
    end
  end

  describe "PATCH#update" do
    it "should update a comment" do
      sign_in(user1, scope: :user)
      patch :update, params: {
        id: comment1.id,
        comic_id: comic1.id,
        comment: { comic_id: comic1.id, body: "Excesior!"
          }}
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(returned_json["comments"].length).to eq 2
      expect(returned_json["comments"].first["body"]).to eq "Excesior!"
    end

    it "should not update a comment made by somebody else" do
      sign_in(user2, scope: :user)
      patch :update, params: {
        id: comment1.id,
        comic_id: comic1.id,
        comment: { comic_id: comic1.id, body: "Excesior!"
          }}
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 401
    end

    it "should not update a comment if not logged in" do
      patch :update, params: {
        id: comment1.id,
        comic_id: comic1.id,
        comment: { comic_id: comic1.id, body: "Excesior!"
          }}
      expect(response.status).to eq 302
    end
  end

  describe "DELETE#destroy" do
    it "should remove a comment" do
      sign_in(user1, scope: :user)
      delete :destroy, params: { id: comment1.id, comic_id: comic1.id}
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(returned_json["comments"].length).to eq 1
    end

    it "should not remove a comment made by somebody else" do
      sign_in(user2, scope: :user)
      delete :destroy, params: { id: comment1.id, comic_id: comic1.id}
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 401
    end

    it "should not remove a comment if not logged in" do
      delete :destroy, params: { id: comment1.id, comic_id: comic1.id}
      expect(response.status).to eq 302
    end
  end
end
