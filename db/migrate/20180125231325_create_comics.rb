class CreateComics < ActiveRecord::Migration[5.1]
  def change
    create_table :comics do |t|
      t.string :title, null: false
      t.string :path, null: false
      t.string :author, null: false
      t.string :published_year, null: false
      t.string :preview_image

      t.timestamps
    end
  end
end
