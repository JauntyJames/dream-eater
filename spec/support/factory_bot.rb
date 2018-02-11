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
    sequence(:title) {|n| "#{n}Watchmen"}
    author "Alan Moore"
    description "(-:"
    published_year 1987
    creator_id 1
    file { Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'test-file.pdf'), 'application/pdf') }
  end
end

FactoryBot.define do
  factory :shelf do
    user_id 1
    comic_id 1
    favorite true
    bookmark 5
  end
end

FactoryBot.define do
  factory :comment do
    user_id 1
    comic_id 1
    body "What a comic!"
  end
end
