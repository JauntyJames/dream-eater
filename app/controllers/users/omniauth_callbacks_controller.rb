class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def goodreads
    @user = User.from_omniauth(request.env["omniauth.auth"])
    @user.email = "#{request.env["omniauth.auth"]["uid"]}@DreamEater.com"
    @user.remote_profile_photo_url = request.env["omniauth.auth"]["info"]["image"]
    binding.pry
    sign_in_and_redirect @user
  end
end
