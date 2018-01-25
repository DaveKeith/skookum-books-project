class CreateCheckoutBooks < ActiveRecord::Migration
  def change
    create_table :checkout_books do |t|
      t.integer :list_id
      t.string :title
      t.string :author
      t.integer :year
      t.integer :isbn

      t.timestamps null: false
    end
  end
end
