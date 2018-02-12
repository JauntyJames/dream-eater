class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def goodreads
    @user = User.from_omniauth(request.env["omniauth.auth"])
    @user.email = "#{request.env["omniauth.auth"]["uid"]}@DreamEater.com"
    @user.remote_profile_photo_url = request.env["omniauth.auth"]["info"]["image"]
    sign_in_and_redirect @user
  end

  def facebook
    if current_user.present?
      current_user.apply_omniauth(request.env["omniauth.auth"])
      redirect_to edit_user_registration_path, notice: "Facebook Account Linked!"
    else
      @user = User.from_omniauth(request.env["omniauth.auth"])
      @user.remote_profile_photo_url = request.env["omniauth.auth"]["info"]["image"]
      binding.pry
      sign_in_and_redirect @user
    end
  end
end
