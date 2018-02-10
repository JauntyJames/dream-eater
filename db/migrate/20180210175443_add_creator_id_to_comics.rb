class AddCreatorIdToComics < ActiveRecord::Migration[5.1]
  def change
    add_column :comics, :creator_id, :integer, null: false
  end
end
