class AuthController < ApplicationController
  def is_signed_in?
    if user_signed_in?
      render json: {"signed_in" => true, "user" => current_user}.to_json()
    else
      render json: {"signed_in" => false}.to_json()
    end
  end

  def destroy
    current_user.update_attributes(provider: nil, uid: nil)
    redirect_to edit_user_registration_path, notice: "Facebook Account Unlinked"
  end

end
