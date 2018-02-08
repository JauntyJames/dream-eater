class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :favorites

  def favorites
    shelves = object.shelves.where(favorite: true)
    favorites = shelves.map do |shelf|
      shelf.comic
    end
  end
end
