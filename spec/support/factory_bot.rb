require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password 'password'
    password_confirmation 'password'
  end

end

FactoryBot.define do
  factory :comic do
    title "Watchmen"
    author "Alan Moore"
    description "(-:"
    published_year 1987
    file { Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'test-file.pdf'), 'application/pdf') }
  end
end
