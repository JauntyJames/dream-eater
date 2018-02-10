class Api::V1::ComicsController < ApplicationController
  protect_from_forgery unless: -> { request.format.form_data? || request.format.json? }
  before_action :authenticate_user!, except: [:index, :show]
  skip_before_action :verify_authenticity_token

  def index
    if params[:q].length > 0
      q = params[:q].strip.downcase
      results = comic_search('title', q)
      results = results.or(comic_search('author', q))
      results = results.or(comic_search('description', q))
      results = results.or(comic_search('published_year', q))
      render json: results
    else
      render json: Comic.all
    end
  end

  def show
    comic = Comic.find(params[:id])
    render json: comic, serializer: ComicShowSerializer
  end

  def create
    new_comic = Comic.new(comic_params)
    if new_comic.save
      render json: {id: new_comic.id}
    else
      flash[:alert] = "Did you fill everything out correctly?"
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

  def comic_search(search_field, search_term)
    Comic.where("LOWER(#{search_field}) LIKE ?", "%#{search_term}%")
  end

  def comic_params
    params.permit(:file, :title, :author, :description, :published_year)
  end

end
