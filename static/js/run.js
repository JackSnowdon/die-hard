$(document).ready(function() {
  
  $("#rollD4").click(function() {
    var result = getDiceRoll(4);
    $("#d4").text(result);
    console.log(result);
  });

  $("#rollD6").click(function() {
    var result = getDiceRoll(6);
    $("#d6").text(result);
    console.log(result);
  });
  
  $("#rollD8").click(function() {
    var result = getDiceRoll(8);
    $("#d8").text(result);
    console.log(result);
  });
  
  $("#rollD10").click(function() {
    var result = getDiceRoll(10);
    $("#d10").text(result);
    console.log(result);
  });
  
  $("#rollD12").click(function() {
    var result = getDiceRoll(12);
    $("#d12").text(result);
    console.log(result);
  });
  
  $("#rollD20").click(function() {
    var result = getDiceRoll(20);
    $("#d20").text(result);
    console.log(result);
  });
  
  
  function getDiceRoll(x) {
    var diceRoll = Math.floor(Math.random() * x) + 1;
    return diceRoll;
  }

});
