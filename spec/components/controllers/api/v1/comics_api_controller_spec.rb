require 'rails_helper'

RSpec.describe Api::V1::ComicsController, type: :controller do
  let!(:user) {FactoryBot.create(:user)}
  let!(:comic1) {FactoryBot.create(:comic)}
  let!(:comic2) {FactoryBot.create(:comic)}
  let!(:comic3) {FactoryBot.create(:comic)}

  describe "GET#index" do
    it "should return a list of wizards" do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["comics"].length).to eq 3
      expect(returned_json["comics"][0]["title"]).to eq "Watchmen"
      expect(returned_json["comics"][0]["author"]).to eq "Alan Moore"
      expect(returned_json["comics"][0]["thumbnail"]).to eq "/uploads/comic/file/#{returned_json["comics"][0]["id"]}/thumb_test-file.jpg"
    end
  end

  describe "GET#show" do
    it "should return information about a comic" do
      get :show, params: { id: comic1.id }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["comic"]["title"]).to eq("Watchmen")
      expect(returned_json["comic"]["description"]).to eq("(-:")
      expect(returned_json["comic"]["published_year"]).to eq "1987"
      expect(returned_json["comic"]["url"]).to eq "/uploads/comic/file/#{returned_json["comic"]["id"]}/test-file.pdf"
    end
  end

  describe "POST#create" do
    it "should add a comic to the database" do
      sign_in :user, user
      post :create, params: {
        title: "Henchgirl",
        author: "Kristen Gudsnuk",
        published_year: 2017,
        file: Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'test-file.pdf'), 'application/pdf')
      }
      expect(Comic.all.last.title).to eq("Henchgirl")
    end

    it "should not add a comic if the user is not authenticated" do
      post :create, params: {
        title: "Henchgirl",
        author: "Kristen Gudsnuk",
        published_year: 2017,
        file: Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'test-file.pdf'), 'application/pdf')
      }
      # expect(response.status).to eq 401
      expect(Comic.all.last.title).to eq("Watchmen")
    end

    it "should not add a comic if the form was not filled out" do
      sign_in :user, user
      post :create, params: {
        title: "Henchgirl",
        author: "Kristen Gudsnuk",
        published_year: 2017
      }
      returned_json = JSON.parse(response.body)
      expect(returned_json["errors"][0]).to eq("File can't be blank")
    end
  end
end
