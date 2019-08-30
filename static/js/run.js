window.localStorage;

$(document).ready(function() {
  // Global Vars

  var player = new Object();
  player.maxHp = 100;
  player.currentHp = 100;
  player.power = 10;
  player.kills = 0;
  player.gold = 0;

  var enemy = new Object();
  enemy.name = "Steve";
  enemy.currentHp = 100;
  enemy.maxHp = 100;
  enemy.power = 10;

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

      // Hide entry form and displays players name 

      if (typeof player.name !== "undefined") {
        $(".p-name").text(player.name);
        $(".kill-meter").text(player.kills);
        $(".gold-meter").text(player.gold);
        $("#name-entry").fadeOut("slow", function() {
          $(".hide-on-start").fadeIn("slow");
          $(".nav-login").fadeIn("slow");
          $(".shop-div").fadeIn("slow");
        });
      }
    }
  });

  // Start Game

  $("#start-game").click(function() {
    if (player.kills > 0) {
      enemy.currentHp = setEnemyHealth(player.kills);
      enemy.maxHp = enemy.currentHp;
      enemy.power = setEnemyPower(player.kills);
    }
    $(".shop-div").hide();
    $("#start-game").hide();
    $(".player-max").text(player.maxHp);
    $("#player-current").text(player.currentHp);
    $("#enemy-max").text(enemy.maxHp);
    $("#enemy-current").text(enemy.currentHp);
    $(".player-health").fadeIn("slow");
    $(".enemy-health").fadeIn("slow");
    $(".player-roll").fadeIn("slow");
    if ($(".game-content").attr("hidden", false)) {
      $(".game-content").fadeIn("slow");
    }
  });


  $("#attack-roll").click(function() {
    $("#attack-roll").attr("disabled", true)

    // Player Turn

    let baseDmg = getDiceRoll(8);
    let power = attack(player.power, player.kills);
    let damage = 0;

    if (getDiceRoll(100) > 90) {
      $("#crit").show().text("Crit!").css("color", "red");
      damage = attack(baseDmg, power) * 5;
    }
    else {
      damage = attack(baseDmg, power);
    }

    enemy.currentHp -= damage;

    $(".player-attack").fadeIn("slow");
    $("#player-result").fadeIn("slow").text(damage);
    $("#enemy-current").html(enemy.currentHp);

    // Checks if enemy is dead and display health as 0

    if (areYouDead(enemy.currentHp)) {
      player.kills++;
      let goldDrop = getDiceRoll(player.currentHp * 2);
      earnGold(goldDrop);
      $(".kill-meter").html(player.kills);
      $(".gold-meter").html(player.gold);
      $("#enemy-current").html(0);
      $("#result").html("Victory! The Enemy dropped " + goldDrop + " Gold coins!");
      setTimeout(function() {
        $("#crit").fadeOut("slow").html("");
        $(".game-content").fadeOut("slow", function() {
          $(".restart").fadeIn("slow");
        });
      }, 3000);
      return;
    }

    setTimeout(function() {
      $("#crit").fadeOut("slow").html("");

      // Enemy Turn 

      let baseDmg = getDiceRoll(8);
      console.log(baseDmg);
      let damage = attack(baseDmg, enemy.power);


      player.currentHp -= damage;
      $(".enemy-attack").fadeIn("slow");
      $("#enemy-result").fadeIn("slow").text(damage);
      $("#player-current").html(player.currentHp);

      // Checks if player is dead and display health as 0

      if (areYouDead(player.currentHp)) {
        $("#player-current").html(0)
        let goldDrop = getDiceRoll(enemy.currentHp);
        earnGold(goldDrop);
        $(".gold-meter").html(player.gold);
        $("#result").html("You Loser! Picking yourself back up, you find " + goldDrop + " loose Gold coins!");
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

  // Restart 

  $("#restart").click(function() {
    player.currentHp = 100;
    $("#player-result").fadeOut().html("");
    $("#enemy-result").fadeOut().html("");
    $(".enemy-attack").fadeOut();
    $(".player-attack").fadeOut();
    $(".restart").fadeToggle("slow", function() {
      $("#start-game").fadeIn("slow");
      $(".shop-div").fadeIn("slow");
      $("#result").html("");
      $("#attack-roll").attr("disabled", false);
    });
  });

  // Shop

  $("#shop").click(function() {
    $("#start-game").hide();
    $(".shop-div").fadeOut("slow");
    $(".player-max").text(player.maxHp);
    $(".player-power").text(player.power);
    setTimeout(function() {
      $(".shop-content").fadeIn("slow");
    }, 1000);
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

  function setEnemyHealth(kills) {
    var base = 100;
    var mod = rollTwoDie(kills, 10) * 3;
    return base + mod;
  }

  function setEnemyPower(kills) {
    var base = 10;
    var mod = getDiceRoll(kills);
    return base + mod;
  }

  function rollTwoDie(a, b) {
    var die1 = getDiceRoll(a);
    var die2 = getDiceRoll(b);
    return die1 + die2;
  }

  function earnGold(hp) {
    return player.gold += hp;
  }

  // Display Helpers 


  // Save System

  $("#save-button").click(function() {
    var saveCheck = confirm("Saving will overwrite " + player.name + "'s save, press OK to confirm");
    if (saveCheck == true) {
      save();
    }
    else {
      alert("Game not saved");
    }
  });

  $("#load-button").click(function() {
    var loadCheck = confirm("Load your save file? (This will overwrite your current save)");
    if (loadCheck == true) {
      load();
      $(".nav-login").fadeIn("slow");
      $(".kill-meter").text(player.kills);
      $(".gold-meter").text(player.gold);
      $(".p-name").text(player.name);
      $("#name-entry").fadeOut("slow", function() {
        $(".hide-on-start").fadeIn("slow");
        $(".shop-div").fadeIn("slow");
      });
    }
    else {
      alert("Game not loaded");
    }
  });

  function save() {
    var save = {
      playerName: player.name,
      playerKills: player.kills,
      playerGold: player.gold
    };
    localStorage.setItem("save", JSON.stringify(save));
  }

  function load() {
    var saveGame = JSON.parse(localStorage.getItem("save"));
    if (saveGame != null && saveGame != undefined) {
      player.name = saveGame.playerName;
      player.kills = saveGame.playerKills;
      player.gold = saveGame.playerGold;
    }
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
    else {
      alert("You Rolled: " + total);
    }
  });
});
