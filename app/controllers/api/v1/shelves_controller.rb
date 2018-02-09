class Api::V1::ShelvesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token


  def create
    existing_shelf = Shelf.where(user_id: current_user.id, comic_id: shelf_params[:comic_id])
    if existing_shelf.empty?
      new_shelf = Shelf.new(shelf_params)
      new_shelf.user = current_user
      if new_shelf.save
        render json: { shelf: new_shelf, message: shelf_message }
      else
        render json: { message: new_shelf.errors.full_messages }, status: :unprocessable_entity
      end
    else
      existing_shelf.first.update(shelf_params)
      render json: { message: shelf_message }
    end
  end

  def update
    binding.pry
  end

  protected

  def shelf_params
    params.require(:shelf).permit(:comic_id, :bookmark, :favorite)
  end

  def shelf_message
    if shelf_params[:bookmark]
      return "Bookmark created."
    elsif shelf_params[:favorite]
      return "Comic added to your favorites!"
    end

  end

end
