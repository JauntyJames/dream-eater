class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :rating, :user, :editable, :created_at, :updated_at
  def editable
    current_user && current_user === object.user
  end
end
