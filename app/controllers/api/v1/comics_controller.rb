class Api::V1::ComicsController < ApplicationController
    def index
      render json: Comic.all
    end

    def show
      @comic = Comic.find(params[:id])
      render json: { comic: @comic }  
    end
end
