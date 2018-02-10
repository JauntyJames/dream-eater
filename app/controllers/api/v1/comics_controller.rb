class Api::V1::ComicsController < ApplicationController
  protect_from_forgery unless: -> { request.format.form_data? || request.format.json? }
  before_action :authenticate_user!, except: [:index, :show]
  skip_before_action :verify_authenticity_token

  def index
    if params[:q].length > 0
      results = comic_search(['title', 'author', 'description', 'published_year'], params[:q])
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
    new_comic.creator_id = current_user.id
    if new_comic.save
      render json: {id: new_comic.id}
    else
      flash[:alert] = "Did you fill everything out correctly?"
      render json: { errors: new_comic.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # def edit
  #   binding.pry
  #   edit_comic = Comic.find(params[:id])
  #   if current_user.id == edit_comic.id
  #     render json: edit_comic
  #   else
  #     render json: { messages: "You can't edit this comic!" }, status: 401
  #   end
  # end

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

  def comic_search(search_fields, search_term)
    results = Comic.none
    search_fields.each do |search_field|
      results = results.or(Comic.where("LOWER(#{search_field}) LIKE ?", "%#{search_term.strip.downcase}%"))
    end
    results
  end

  def comic_params
    params.permit(:file, :title, :author, :description, :published_year, :q)
  end

end
