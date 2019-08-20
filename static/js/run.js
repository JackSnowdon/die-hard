$(document).ready(function() {

  // Global Vars

  var player = new Object();

  var enemy = new Object();
  enemy.name = "Steve";

  // Game Flow

  // Name Entry

  $("#name-sumbit").click(function() {

    // Checks name has value (Trimmed in case of whitespace)

    var playerName = $("#player-name").val()

    if ($.trim(playerName) == '') {
      alert('You surely must have a name!');
    }
    else {
      player.name = playerName;
      console.log(player, player.name);

      // Hide entry form and displays players name 

      if (typeof player.name !== "undefined") {
        $(".p-name").text(player.name);
        $("#name-entry").fadeOut("slow", function() {
          $(".hide-on-start").fadeIn("slow");
        });
      }
    }

  });

  // Start Game

  $("#start-game").click(function() {
    $("#start-game").hide()
    var enemyRoll = rollTwoDie(6, 8);
    enemy.enemyRoll = enemyRoll
    console.log(enemyRoll);
    $("#enemy-result").text(enemyRoll);
    $(".enemy-roll").fadeIn("slow", function() {
      $(".player-roll").fadeIn("slow");
    });
  });

  $("#testRoll").click(function() {
    var playerRoll = rollTwoDie(6, 8);
    player.playerRoll = playerRoll;
    console.log(player.playerRoll, enemy.enemyRoll);
    $("#testRoll").fadeOut("slow", function() {
      $("#player-result").text(playerRoll);
      if (enemy.enemyRoll > player.playerRoll) {
        $("#result").text("You Loser!");
        $("#result").fadeIn("slow").css("color", "red");
      }
      else if (enemy.enemyRoll < player.playerRoll) {
        $("#result").text("You winner!");
        $("#result").fadeIn("slow".css("color", "green"));
      }
      else {
        $("#result").text("You draw!");
        $("#result").fadeIn("slow");
      }
    });


  });



  // Enemy Rolls 

  function rollTwoDie(a, b) {
    var die1 = getDiceRoll(a);
    var die2 = getDiceRoll(b);
    var roll = die1 + die2;
    return roll;
  }

  // Die Rolls

  $("#rollD4").click(function() {
    var result = getDiceRoll(4);
    $("#d4").text(result);
    if (typeof player.name !== "undefined") {
      alert(player.name + " Rolled: " + result);
    }
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
    if (typeof player.name !== "undefined") {
      alert(player.name + " Rolled: " + total);
    }
    else return;
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
