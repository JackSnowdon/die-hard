//  Below creates localStorage for Saving/Loading

window.localStorage;

$(document).ready(function() {
  // Global Vars

  // Player Object

  var player = new Object();
  player.maxHp = 100;
  player.currentHp = 100;
  player.power = 10;
  player.kills = 0;
  player.gold = 250;
  player.upgradeHp = 1;
  player.upgradePower = 1;

  // Enemy Object

  var enemy = new Object();
  enemy.name = "Steve";
  enemy.currentHp = 100;
  enemy.maxHp = 100;
  enemy.power = 10;

  // Game Flow

  // Name Entry

  $("#name-sumbit").click(function() {

    // Checks name has value (Trimmed in case of whitespace)

    var playerName = $("#player-name").val();

    if ($.trim(playerName) == '') {
      alert('You surely must have a name!');
    }
    else {
      player.name = playerName;

      // Hides name entry form and displays key player infomation 

      if (typeof player.name !== "undefined") {
        $(".p-name").text(player.name);
        $(".kill-meter").text(player.kills);
        $(".gold-meter").text(player.gold);
        $("#name-entry").fadeOut("slow", function() {

          // Displays Start Game and Shop Buttons

          $(".hide-on-start").fadeIn("slow");
          $(".nav-login").fadeIn("slow");
          $(".shop-div").fadeIn("slow");
        });
      }
    }
  });



  $("#start-game").click(function() {

    // Sets enemy stats using player.kills as a modifer to increase difficulty

    if (player.kills > 0) {
      enemy.currentHp = setEnemyHealth(player.kills);
      enemy.maxHp = enemy.currentHp;
      enemy.power = setEnemyPower(player.kills);
    }

    // Hides starting buttons and renders game content


    $(".shop-div").hide();
    $("#start-game").hide();
    $(".player-max").text(player.maxHp);
    $("#player-current").text(player.maxHp);
    $("#enemy-max").text(enemy.maxHp);
    $("#enemy-current").text(enemy.currentHp);
    $(".player-health").fadeIn("slow");
    $(".enemy-health").fadeIn("slow");
    $(".player-roll").fadeIn("slow");

    // On restart below loop makes sure correct content is displaying

    if ($(".game-content").attr("hidden", false)) {
      $(".game-content").fadeIn("slow");
    }
  });

  // Player Turn

  $("#attack-roll").click(function() {
    $("#attack-roll").attr("disabled", true);

    // Player Attack 

    let baseDmg = getDiceRoll(8);
    let power = attack(player.power, player.kills);
    let damage = 0;

    // Rolls for a crictal chance 

    if (getDiceRoll(100) > 90) {
      $("#crit").show().text("Crit!").css("color", "red");
      damage = attack(baseDmg, power) * 5;
    }
    else {
      damage = attack(baseDmg, power);
    }

    // Reduces enemy health and displays results

    enemy.currentHp -= damage;

    $(".player-attack").fadeIn("slow");
    $("#player-result").fadeIn("slow").text(damage);
    $("#enemy-current").html(enemy.currentHp);

    // Checks if enemy is dead for player victory content


    if (areYouDead(enemy.currentHp)) {
      player.kills++;

      // Creates "random" gold amount using remain HP

      let goldDrop = getDiceRoll(player.currentHp * 2);
      earnGold(goldDrop);

      // Update and display player stats

      $(".kill-meter").html(player.kills);
      $(".gold-meter").html(player.gold);

      // Sets enemy HP to 0 and victory message


      $("#enemy-current").html(0);
      $("#result").html("Victory! The Enemy dropped " + goldDrop + " Gold coins!");

      // Hides game content and displays restart

      setTimeout(function() {
        $("#crit").fadeOut("slow").html("");
        $(".game-content").fadeOut("slow", function() {
          $(".restart").fadeIn("slow");
        });
      }, 3000);
      return;
    }

    // Enemy Turn 

    setTimeout(function() {
      $("#crit").fadeOut("slow").html("");

      // Enemy Attack 

      let baseDmg = getDiceRoll(8);
      let damage = attack(baseDmg, enemy.power);

      // Reduces player health and displays results

      player.currentHp -= damage;
      $(".enemy-attack").fadeIn("slow");
      $("#enemy-result").fadeIn("slow").text(damage);
      $("#player-current").html(player.currentHp);

      // Checks if player is dead 

      if (areYouDead(player.currentHp)) {
        $("#player-current").html(0);

        // Reduced gold drop for losing

        let goldDrop = getDiceRoll(enemy.currentHp);
        earnGold(goldDrop);
        $(".gold-meter").html(player.gold);
        $("#result").html("You Loser! Picking yourself back up, you find " + goldDrop + " loose Gold coins!");

        // Hides game content and displays restart

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

    // Sets playerHP back to full and hides rest of game content 

    player.currentHp = player.maxHp;
    $("#player-result").fadeOut().html("");
    $("#enemy-result").fadeOut().html("");
    $(".enemy-attack").fadeOut();
    $(".player-attack").fadeOut();

    // Takes user back to start game & shop buttons

    $(".restart").fadeToggle("slow", function() {
      $("#start-game").fadeIn("slow");
      $(".shop-div").fadeIn("slow");
      $("#result").html("");
      $("#attack-roll").attr("disabled", false);
    });
  });

  // Shop

  $("#shop").click(function() {

    // Hides start game and displays shops 

    $("#start-game").hide();
    $(".shop-div").fadeOut("slow");
    $(".player-max").text(player.maxHp);
    $(".player-power").text(player.power);

    // Sets and displays upgrade cost 

    var hpCost = upgradeAmount(player.upgradeHp);
    $(".hp-cost").text(hpCost);
    var powerCost = upgradeAmount(player.upgradePower);
    $(".power-cost").text(powerCost);
    setTimeout(function() {
      $(".shop-content").fadeIn("slow");
    }, 1000);
  });

  $("#buy-hp").click(function() {

    // If buyUpgrade function is complete, peforms and displays the upgrade

    if (buyUpgrade(".hp-cost", player.maxHp)) {
      player.maxHp += 10;
      $(".player-max").text(player.maxHp);
      player.upgradeHp++;
      var hpCost = upgradeAmount(player.upgradeHp);
      $(".hp-cost").text(hpCost);
    }
  });

  $("#buy-power").click(function() {
    if (buyUpgrade(".power-cost", player.power)) {
      player.power += 2;
      $(".player-power").text(player.power);
      player.upgradePower++;
      var powerCost = upgradeAmount(player.upgradePower);
      $(".power-cost").text(powerCost);
    }
  });

  function buyUpgrade(x, y) {

    // Gets upgrade cost from button press

    var cost = $(x).text();

    // Checks if player has enough gold

    if (player.gold >= cost) {
      var purchaseCheck = confirm("Buy upgrade for " + cost + " Gold?");

      // If confirmed removes gold from player amount

      if (purchaseCheck == true) {
        player.gold -= cost;
        $(".gold-meter").html(player.gold);
        return true;
      }

      // If player clicks no on confirm

      else {
        alert("Upgrade not purchased");
      }

      // If player doesn't have enough gold

    }
    else {
      alert("You don't have enough Gold!");
    }
  }

  // Sets upgrade amount

  function upgradeAmount(x) {
    return x * 250;
  }

  // Back button to start game screen

  $("#shop-back").click(function() {
    $(".shop-content").fadeOut("slow");
    setTimeout(function() {
      $("#start-game").fadeIn("slow");
      $(".shop-div").fadeIn("slow");
    }, 1000);
  });

  // Helper functions 

  // getDieRoll takes amount of "sides" as a parameter

  function getDiceRoll(x) {
    return Math.floor(Math.random() * x) + 1;
  }

  function attack(base, power) {
    return base + power;
  }
  
  // Checker for endgame

  function areYouDead(hp) {
    return hp <= 0;
  }
  
  // Below functions take player.kills as a parameter to randomise enemy stats everygame

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
  
  // Adds gold to players purse 

  function earnGold(x) {
    return player.gold += x;
  }

  // Save System

  $("#save-button").click(function() {
    
    // Confirms if player wants to save progress
    
    var saveCheck = confirm("Saving will overwrite " + player.name + "'s save, press OK to confirm");
    if (saveCheck == true) {
      save();
    }
    else {
      alert("Game not saved");
    }
  });

  $("#load-button").click(function() {
    
    // Confirms player wants to load local save
    
    var loadCheck = confirm("Load your save file? (This will overwrite your current save)");
    if (loadCheck == true) {
      load();
      
      // Loads from local storage and sets player stats
      
      
      $(".nav-login").fadeIn("slow");
      $(".kill-meter").text(player.kills);
      $(".gold-meter").text(player.gold);
      $(".p-name").text(player.name);
      
      // Bypasses name entry and brings user to start game

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
    
    // Stores player info as JSON and saves to local storage
    
    var save = {
      playerName: player.name,
      playerKills: player.kills,
      playerGold: player.gold,
      playerPower: player.power,
      playerHp: player.maxHp,
      upgradeHp: player.upgradeHp,
      upgradePower: player.upgradePower
    };
    localStorage.setItem("save", JSON.stringify(save));
  }

  function load() {
    
    // Retrives from local storage
    
    var saveGame = JSON.parse(localStorage.getItem("save"));
    if (saveGame != null && saveGame != undefined) {
      player.name = saveGame.playerName;
      player.kills = saveGame.playerKills;
      player.gold = saveGame.playerGold;
      player.power = saveGame.playerPower;
      player.maxHp = saveGame.playerHp;
      player.upgradeHp = saveGame.upgradeHp;
      player.upgradePower = saveGame.upgradePower;
    }
  }

  // Die Rolls
  
  // Below are functions for the "dice.html" page, which is mostly for when I play Dudgeons and dragons and forget my dice! 

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

  function getDieResult(x) {
    return parseInt($(x).text());
  }

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
