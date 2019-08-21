$(document).ready(function() {

  // Global Vars

  var player = new Object();
  player.maxHp = 100;
  player.currentHp = 100;
  player.power = 20;

  var enemy = new Object();
  enemy.name = "Steve";
  enemy.maxHp = 100;
  enemy.currentHp = 100;
  enemy.power = 20;

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
    $("#start-game").hide();
    $("#player-max").text(player.maxHp);
    $("#player-current").text(player.currentHp);
    $("#enemy-max").text(enemy.maxHp);
    $("#enemy-current").text(enemy.currentHp);
    $(".player-health").fadeIn("slow");
    $(".enemy-health").fadeIn("slow");
    $(".player-roll").fadeIn("slow");
  });

  $("#attack-roll").click(function() {
    $("#attack-roll").attr("disabled", true)

    // Player Turn

    let baseDmg = getDiceRoll(8);
    let power = player.power;
    let damage = attack(baseDmg, power);

    enemy.currentHp -= damage;

    $(".player-attack").fadeIn("slow");
    $("#player-result").text(damage);
    $("#enemy-current").html(enemy.currentHp);
    
    // Checks if enemy is dead and display health as 0

    if (areYouDead(enemy.currentHp)) {
      $("#enemy-current").html(0);
      $("#result").text("You Win!");
      setTimeout(function() {
          $(".game-content").fadeOut("slow", function() {
            $(".restart").fadeIn("slow");
          });
      }, 3000);
      return;
    }

    setTimeout(function() {

      // Enemy Turn 

      let baseDmg = getDiceRoll(8);
      let power = enemy.power;
      let damage = attack(baseDmg, power);

      player.currentHp -= damage;
      $(".enemy-attack").fadeIn("slow");
      $("#enemy-result").text(damage);
      $("#player-current").html(player.currentHp);
      
      // Checks if player is dead and display health as 0

      if (areYouDead(player.currentHp)) {
        $("#player-current").html(0)
        $("#result").text("You Loser!");
        setTimeout(function() {
          $(".game-content").fadeOut("slow", function() {
            $(".restart").fadeIn("slow");
          });
        }, 3000);
        return;
      }
      $("#attack-roll").attr("disabled", false);
    }, 1500);
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


  function getDiceRoll(x) {
    return Math.floor(Math.random() * x) + 1;
  }

  function getDieResult(x) {
    return parseInt($(x).text());
  }

  function attack(base, power) {
    return base + power;
  }

  function areYouDead(hp) {
    return hp <= 0;
  }

  // Display Helpers 



});
