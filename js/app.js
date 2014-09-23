$(document).ready( function() {

  $("#start").click(function () {
    $("#intro").fadeOut("fast", function() {
      $("#quiz").fadeIn("fast");
    });
  });

});