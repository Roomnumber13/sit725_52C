$(document).ready(function(){
    $('.modal').modal();
    $(".change-color").on("click", function() {
      // Changes the background color of the button
      $(this).css("background-color", "#ff5722");
    });
  });