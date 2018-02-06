class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def index
    render json: User.all
  end

  def show
    this_user = User.find(params[:id])
    favorites = Shelf.where(user: this_user, favorite: true)
    render json: { user: this_user, favorites: favorites }
  end
end
