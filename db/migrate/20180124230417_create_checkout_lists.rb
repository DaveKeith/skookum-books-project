class CreateCheckoutLists < ActiveRecord::Migration
  def change
    create_table :checkout_lists do |t|
      t.string :email

      t.timestamps null: false
    end
  end
end
