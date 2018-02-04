class Comic < ApplicationRecord
  mount_uploader :file, ComicFileUploader
  validates :title, presence: true
  validates :author, presence: true
  validates :file, presence: true # format: { with: /\A\S+\.(pdf|PDF)\z/, message: "must be a valid pdf"}
  validates :published_year, presence: true, numericality: { greater_than: 1800, less_than_or_equal_to: Date.today.year }
end
