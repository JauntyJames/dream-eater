class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :comic

  validates :body, presence: true
end
