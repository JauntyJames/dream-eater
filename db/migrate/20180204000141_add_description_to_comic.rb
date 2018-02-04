class AddDescriptionToComic < ActiveRecord::Migration[5.1]
  def up
    add_column :comics, :description, :string
    add_column :comics, :file, :string, null: false
    remove_column :comics, :path
  end

  def down
    remove_column :comics, :description
    remove_column :comics, :file
    add_column :comics, :path, :string, null: false
  end
end
