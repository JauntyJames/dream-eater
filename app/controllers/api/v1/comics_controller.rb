class Api::V1::ComicsController < ApplicationController
  protect_from_forgery unless: -> { request.format.form_data? }

    def index
      render json: Comic.all
    end

    def show
      @comic = Comic.find(params[:id])
      render json: { comic: @comic }
    end

    def create
      new_comic = Comic.new(comic_params)
      if new_comic.save
        redirect_to :index
      else
        render :json { new_comic.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def comic_params
      params.permit(:path, :title, :author, :description, :publishedYear)
    end

end

# {"title"=>"Remnants", "file"=>"[object File]", "author"=>"zach", "description"=>"book", "publishedYear"=>"2016", "controller"=>"api/v1/comics", "action"=>"create"}
