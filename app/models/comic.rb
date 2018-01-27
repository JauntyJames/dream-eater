class Comic < ApplicationRecord
  mount_uploader :path, ComicFileUploader
  validates :title, presence: true
  validates :author, presence: true
  validates :path, presence: true
  validates :published_year, presence: true
end
