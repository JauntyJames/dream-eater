class Comic < ApplicationRecord
  mount_uploader :file, ComicFileUploader
  validates :title, presence: true, uniqueness: true
  validates :author, presence: true
  validates :file, presence: true
  validates :published_year, presence: true, numericality: { greater_than: 1800, less_than_or_equal_to: Date.today.year }

  has_many :shelves
  has_many :users, through: :shelves

  has_many :comments
  has_many :users, through: :comments
end
