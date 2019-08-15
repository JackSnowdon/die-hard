$(document).ready(function() {

  // Game Flow

  var player = new Object();

  $("#name-sumbit").click(function() {
    var playerName = $("#player-name").val()
    player.name = playerName;
    
    console.log(player, player.name);

    if (typeof player.name !== "undefined") {
      $("#p-name").text(player.name);
      $("#name-tag").show();
    }
  });

  // Die Rolls

  $("#rollD4").click(function() {
    var result = getDiceRoll(4);
    $("#d4").text(result);
    if (typeof player.name !== "undefined") {
      alert(player.name + " Rolled: " + result);
    }
    else return;
  });

  $("#rollD6").click(function() {
    var result = getDiceRoll(6);
    $("#d6").text(result);
  });

  $("#rollD8").click(function() {
    var result = getDiceRoll(8);
    $("#d8").text(result);
  });

  $("#rollD10").click(function() {
    var result = getDiceRoll(10);
    $("#d10").text(result);
  });

  $("#rollD12").click(function() {
    var result = getDiceRoll(12);
    $("#d12").text(result);
  });

  $("#rollD20").click(function() {
    var result = getDiceRoll(20);
    $("#d20").text(result);
  });

  // Die Totals

  $("#totalButton").click(function() {


    var d4 = getDieResult("#d4");
    var d6 = getDieResult("#d6");
    var d8 = getDieResult("#d8");
    var d10 = getDieResult("#d10");
    var d12 = getDieResult("#d12");
    var d20 = getDieResult("#d20");

    var total = d4 + d6 + d8 + d10 + d12 + d20;

    console.log(total);

    $("#total").text(total);
  });

  // Helper functions 

  function getDieResult(x) {
    var d = parseInt($(x).text());
    return d;
  }


  function getDiceRoll(x) {
    var diceRoll = Math.floor(Math.random() * x) + 1;
    return diceRoll;
  }

  // Display Helpers 



});
