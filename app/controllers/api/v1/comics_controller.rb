class Api::V1::ComicsController < ApplicationController
  protect_from_forgery unless: -> { request.format.form_data? }

  def index
    render json: Comic.all
  end

  def show
    comic = Comic.find(params[:id])
    render json: comic, serializer: ComicShowSerializer
  end

  def create
    if user_signed_in?
      new_comic = Comic.new(comic_params)
      if new_comic.save
        redirect_to "/*path"
      else
        render json: { errors: new_comic.errors.full_messages }, status: :unprocessable_entity
      end
    else
      redirect_to new_user_session_path
    end
  end

  protected

  def comic_params
    params.permit(:file, :title, :author, :description, :published_year)
  end

end
