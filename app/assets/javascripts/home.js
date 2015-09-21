$(document).ready(function(){
var baseURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/products';

function addProductCard(productData){
  var name = productData.name;
  var basePrice = productData.base_price;
  var description = productData.description;
  var quantityOnHand = productData.quantity_on_hand;
  var color = productData.color;
  var weight = productData.weight;
  $.ajax('/add_product_card',
  {
    type: "GET",
    data: {
      product: {name: name, base_price: basePrice, description: description, quantity_on_hand: quantityOnHand, color: color, weight: weight}
    },
    success: function(data){
      console.log(data);
      $('#turd').append(data);
    },
    error: function(data){
      console.log(data);
    }

  })
}

function indexProducts(){
  $.ajax(baseURL,
    {
      type: 'GET',
      success: function(data) {
        for(index in data.products) {
          var product = data.products[index];
          // console.log(product);
          addProductCard(product);
        }
      },
      error: function(data) {

      }
    }
  )}

indexProducts();

});
