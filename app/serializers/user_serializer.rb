class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :favorites, :profile_photo, :created_at

  def favorites
    shelves = object.shelves.where(favorite: true)
    favorites = shelves.map do |shelf|
      shelf.comic
    end
  end
end
