class Api::V1::ComicsController < ApplicationController
    def index
      render json: Comic.all
    end
end
