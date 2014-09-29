$(document).ready( function() {

  $("#start").click( function () {
    $("#intro").fadeOut("fast", function() {
      $("#quiz").fadeIn("fast");
    });
  });

  $("#photo1").click( function() {
    $("#photo1").addClass("correct");
    $("#photo2").addClass("wrong");
    $(".results").fadeIn("fast");
  });
});

