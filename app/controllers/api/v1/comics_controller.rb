class Api::V1::ComicsController < ApplicationController
  protect_from_forgery unless: -> { request.format.form_data? || request.format.json? }
  before_action :authenticate_user!, except: [:index, :show]
  skip_before_action :verify_authenticity_token

  def index
    render json: Comic.all
  end

  def show
    comic = Comic.find(params[:id])
    render json: comic, serializer: ComicShowSerializer
  end

  def create
    new_comic = Comic.new(comic_params)
    if new_comic.save
      redirect_to api_v1_comics_path
    else
      render json: { errors: new_comic.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    updated_comic = Comic.find(params[:id])
    if updated_comic.update(comic_params)
      render json: { comic: updated_comic }
    else
      render json: { errors: updated_comic.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    destroyed_comic = Comic.find(params[:id])
    if user_signed_in? && current_user.role == 'admin'
      if destroyed_comic.destroy
        render json: { message: "Comic removed." }
      else
        render json: { message: destroyed_comic.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: "You're not allowed to do that!" }, status: 401
    end
  end

  protected

  def comic_params
    params.permit(:file, :title, :author, :description, :published_year)
  end

end
