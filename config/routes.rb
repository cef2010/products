Rails.application.routes.draw do
  root 'home#index'

  # GET ROUTES
  get 'add_product_card', to: 'home#add_product_card'

end
