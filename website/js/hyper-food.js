var api = "http://13.85.83.174/explorer/";

function search(productId)
{
  //$("#fertilizers").val(product.fertilizer);
  $.get( "http://13.85.83.174/api/Product/" + productId, function( data ) {
    console.log(data);
    $("#seeds").html(data[0].seeds);
    $("#pesticides").html(data[0].pesticides[0]);
    $("#water").html(data[0].waterPh);
    $("#soil").html(data[0].soil);
    $("#fertilizers").html(data[0].fertilizer[0]);
    $("#origin").html(data[0].origin);
  });
}

$(function(){
  $("#search-button").click(function() {
    var productId = $("#search").val();
    search(productId);
  });
});
