class ComicsController < ApplicationController

  def new
    @comic = Comic.new
  end

  def create
    @comic = Comic.new(comic_params)
    if @comic.save
      flash[:notice] = "We got your comic!"
      redirect_to root_path
    else
      @comic
      render :new
    end
  end

  private

  def comic_params
    params.require(:comic).permit(:title, :author, :path, :published_year)
  end
end
