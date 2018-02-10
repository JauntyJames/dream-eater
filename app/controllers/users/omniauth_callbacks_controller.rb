class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def goodreads
    @user = User.from_omniauth(request.env["omniauth.auth"])
    @user.email = "#{request.env["omniauth.auth"]["uid"]}@DreamEater.com"
    sign_in_and_redirect @user
  end
end
