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
        $('#turd').prepend(data);
      },
      error: function(data){
      }
    });
  }

  function indexProducts(){
    $.ajax(baseURL,
      {
        type: 'GET',
        success: function(data) {
          for(index in data.products) {
            var product = data.products[index];
            addProductCard(product);
          }
        },
        error: function(data) {
        }
      }
    )
  }

  indexProducts();

  $('#add_button').click(function(){
    $('#add_new_form').removeClass('hide');
    $('#add_button').addClass('hide');
  });

  $('#add_a_piece').click(function(){
    var name = $('#product_name').val();
    var basePrice = $('#product_price').val();
    var description = $('#product_description').val();
    var quantityOnHand = $('#product_quantity').val();
    var color = $('#product_color').val();
    var weight = $('#product_weight').val();
    $.ajax(baseURL, {
      type: "POST",
      data: {product: {name: name, base_price: basePrice, description: description, quantity_on_hand: quantityOnHand, color: color, weight: weight}},
      success: function(data) {
        console.log(data);
      },
      error: function(data){
        console.log(data);
      }
    });
  });

});
