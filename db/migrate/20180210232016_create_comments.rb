class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.belongs_to :user, null: false
      t.belongs_to :comic, null: false
      t.text :body, null: false
      t.integer :rating

      t.timestamps
    end
  end
end
