class Api::V1::CommentsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!, except: :index
  skip_before_action :verify_authenticity_token

  def index
    comments = Comment.where(comic_id: params[:comic_id])
    render json: comments
  end

  def create
    new_comment = Comment.new(comment_params)
    new_comment.user = current_user
    if new_comment.save
      render json: new_comment
    else
      render json: { messages: new_comment.errors.full_messages }, status: 422
    end
  end

  def update
    updated_comment = Comment.find(params[:id])
    if updated_comment.user_id == current_user.id
      if updated_comment.update(comment_params)
        comments = Comment.where(comic_id: params[:comic_id])
        render json: comments
      else
        render json: { messages: updated_comment.errors.full_messages }, status: 422
      end
    else
      render json: { messages: "That's not your comment to edit!" }, status: 401
    end
  end

  def destroy
    destroyed_comment = Comment.find(params[:id])
    if destroyed_comment.user_id == current_user.id
      if destroyed_comment.destroy
        comments = Comment.where(comic_id: params[:comic_id])
        render json: comments
      else
        render json: { messages: destroyed_comment.errors.full_messages }, status: 422
      end
    else
      render json: { messages: "You're not allowed to do that!" }, status: 401
    end
  end

  protected

  def comment_params
    params.require(:comment).permit(:body, :comic_id, :rating)
  end
end
