class AddPictureToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :profile_photo, :string
    add_column :users, :role, :string, null: false, default: 'member'
  end
end
