class CheckoutBook < ActiveRecord::Base
  belongs_to :checkout_list
end
