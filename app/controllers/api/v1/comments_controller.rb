class Api::V1::CommentsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!, except: [:index, :show]
  skip_before_action :verify_authenticity_token

  def index
    comments = Comment.where(comic_id: params[:comic_id])
    render json: comments
  end

  def show
  end

  def create
    new_comment = Comment.new(comment_params)
    new_comment.user = current_user
    if new_comment.save
      render json: new_comment
    end
  end

  def update
    updated_comment = Comment.find(params[:id])
    if updated_comment.update(comment_params)
      render json: { comments: updated_comment, messages: "Comment updated." }
    end
  end

  def destroy
    destroyed_comment = Comment.find(params[:id])
    if destroyed_comment.destroy
      render json: {comments: destroyed_comment, messages: "Comment removed."}
    end
  end

  protected

  def comment_params
    params.require(:comment).permit(:body, :comic_id, :rating)
  end
end
