class ComicSerializer < ActiveModel::Serializer
  attributes :id, :title, :thumbnail, :author

  def thumbnail
    object.file.thumb.url
  end
end
