class HomeController < ApplicationController
  def index
  end

  def add_product_card
    render(partial: 'product_card', locals: {name: params[:product][:name], base_price: params[:product][:base_price], description: params[:product][:description], quantity_on_hand: params[:product][:quantity_on_hand], color: params[:product][:color], weight: params[:product][:weight], id: params[:product][:id]})
  end
end
