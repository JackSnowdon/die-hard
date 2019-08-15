$(document).ready(function() {

  $("#roll").click(function() {
    rollD6();
  });
  
  function rollD6() {
    var result = getD6Roll();
    $("#die").text(result);
    console.log(result);
  }


  function getD6Roll() {
    var d6Roll = Math.floor(Math.random() * 6) + 1;
    return d6Roll;
  }

});
