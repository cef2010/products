$(document).ready(function(){
  var baseURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/products';

  function addProductCard(productData){
    var name = productData.name;
    var basePrice = productData.base_price;
    var description = productData.description;
    var quantityOnHand = productData.quantity_on_hand;
    var color = productData.color;
    var weight = productData.weight;
    var id = productData.id;
    $.ajax('/add_product_card',
    {
      type: "GET",
      data: {
        product: {name: name, base_price: basePrice, description: description, quantity_on_hand: quantityOnHand, color: color, weight: weight, id: id}
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
    $('#edit_a_piece').addClass('hide');
  });

  $('#add_a_piece').click(function(){
    var name = $('#product_name').val();
    var basePrice = $('#product_price').val();
    var description = $('#product_description').val();
    var quantityOnHand = $('#product_quantity').val();
    var color = $('#product_color').val();
    var weight = $('#product_weight').val();
    var newForm = $('#add_new_form');
    var newButton = $('#add_button');
    $.ajax(baseURL, {
      type: "POST",
      data: {product: {name: name, base_price: basePrice, description: description, quantity_on_hand: quantityOnHand, color: color, weight: weight}},
      success: function(data) {
        addProductCard(data.product);
        newForm[0].reset();
        newForm.addClass('hide');
        newButton.removeClass('hide');
      },
      error: function(data){
        alert('you got an error yo.');
      }
    });
  });

  $(document).on('click', '.delete-button', function(){
    var that = $(this);
    var cardID = that.parent().attr('id');
    $.ajax(baseURL + '/' + cardID, {
      type: 'DELETE',
      success: function(data){
        that.closest('.card-holder').remove();
      },
      error: function(data){
        console.log('now you fucked up');
      }
    })
  });

  var currentID = '';

  $(document).on('click', '.edit-button', function(){
    $('#add_new_form').removeClass('hide');
    $('#add_button').addClass('hide');
    $('#add_a_piece').addClass('hide');
    $('#edit_a_piece').removeClass('hide');
    var cardID = $(this).parent().attr('id');
    currentID = cardID;
    $.ajax(baseURL + '/' + cardID, {
      type: 'GET',
      success: function(data){
        $('#product_name').val(data.product.name);
        $('#product_description').val(data.product.description);
        $('#product_price').val(data.product.base_price);
        $('#product_quantity').val(data.product.quantity_on_hand);
        $('#product_color').val(data.product.color);
        $('#product_weight').val(data.product.weight);
      }
    })
  });

  $('#edit_a_piece').click(function(){
    var name = $('#product_name').val();
    var description = $('#product_description').val();
    var price = $('#product_price').val();
    var quantity = $('#product_quantity').val();
    var color = $('#product_color').val();
    var weight = $('#product_weight').val();
    $.ajax(baseURL + '/' + currentID, {
      type: 'PUT',
      data: {
        product: {
          name: name, description: description, base_price: price, quantity_on_hand: quantity, color: color, weight: weight
        }
      },
      success: function(data){
        
        $('#add_new_form').addClass('hide');
        $('#add_button').removeClass('hide');
        $('#add_a_piece').removeClass('hide');
        $('#edit_a_piece').addClass('hide');
      },
      error: function(data){
        console.log('nope');
      }
    })
  });

});
