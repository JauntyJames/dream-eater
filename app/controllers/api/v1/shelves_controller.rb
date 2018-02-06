class Api::V1::ShelvesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def create
    binding.pry
    if shelf_params[:page_num]
      message = "Bookmark created."
    elsif shelf_params[:favorite]
      message = "Comic added to your favorites!"
    end

    new_shelf = Shelf.new(shelf_params)
    new_shelf.user = current_user
    if new_shelf.save
      render json: { shelf: new_shelf, message: message }
    else
      render json: { message: new_shelf.errors.full_messages }, status: :unprocessable_entity
    end
  end

  protected

  def shelf_params
    params.permit(:comic_id, :page_num, :favorite)
  end

end
