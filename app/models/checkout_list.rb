class CheckoutList < ActiveRecord::Base
  has_many :checkout_books
end
