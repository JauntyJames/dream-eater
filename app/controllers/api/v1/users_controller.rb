class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def index
    render json: User.all
  end

  def show
    if current_user.id == params[:id].to_i
      # this_user = User.find(params[:id])
      # binding.pry
      # favorites = this_user.comics.where(favorite: true)
      render json: current_user
    else
      render json: { message: "Can't do that!"}, status: 401
    end
  end
end
