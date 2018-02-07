class ComicShowSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :description, :url, :published_year, :user_bookmark

  def url
    object.file.url
  end

  def user_bookmark
    user_shelves = object.shelves.where(user: scope)
    user_shelves.where.not(bookmark: nil).last
  end
end
