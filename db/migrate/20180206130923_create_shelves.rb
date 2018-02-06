class CreateShelves < ActiveRecord::Migration[5.1]
  def change
    create_table :shelves do |t|
      t.belongs_to :user, null: false
      t.belongs_to :comic, null: false
      t.boolean :favorite, default: false, null: false
      t.integer :bookmark

      t.timestamps
    end
  end
end
