class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name
      t.float :price
      t.integer :quantity
      t.string :category
      t.belongs_to :expense, foreign_key: true
    end
  end
end
