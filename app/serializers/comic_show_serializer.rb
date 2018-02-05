class ComicShowSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :description, :url, :published_year

  def url
    object.file.url
  end
end
