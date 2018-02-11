class Api::V1::CommentsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!, except: [:index]
  skip_before_action :verify_authenticity_token

  def show
    comments = Comment.where(comics_id: params[:id])
    render json: comments
  end

  def create
    comment = Comment.new(comment_params)
    binding.pry
    if comment.save
      render json: comment
    end
  end

  protected

  def comment_params
    params.require(:comment).permit(:body, :comic_id)
  end
end
