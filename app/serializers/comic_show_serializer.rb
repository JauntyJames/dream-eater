class ComicShowSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :description, :url, :published_year, :user_bookmark, :editable

  def url
    object.file.url
  end

  def user_bookmark
    user_shelves = object.shelves.where(user: scope)
    user_shelves.where.not(bookmark: nil).last
  end

  def editable
    current_user && current_user.id == object.creator_id
  end
end
