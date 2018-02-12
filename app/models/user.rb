class User < ApplicationRecord
  mount_uploader :profile_photo, ProfilePhotoUploader
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:goodreads, :facebook]

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.provider = auth.provider
      user.uid = auth.uid
      user.remote_profile_photo_url = auth.info.image.gsub('http://', 'https://')
      user.password = Devise.friendly_token[0,20]
    end
  end

  def apply_omniauth(auth)
    update_attributes(
      provider: auth.provider,
      uid: auth.uid,
      remote_profile_photo_url: auth.info.image
    )
  end

  def has_facebook_linked?
    self.provider.present? && self.uid.present?
  end

  has_many :shelves
  has_many :comics, through: :shelves

  has_many :comments
  has_many :comics, through: :comments

  def admin?
    role == 'admin'
  end
end
