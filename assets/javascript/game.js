var crystalValues;
var crystalImage = ["assets/images/rupee-blue.png", "assets/images/rupee-green.png", "assets/images/rupee-purple.png", "assets/images/rupee-red.png"]
var wins = 0;
var losses = 0;
var crystal; // Will be used later to declare individual crystals
// Will log the player's score as they click the crystals
var playerScore = 0;
// grabs scoreHolder element
var scoreHolder = document.getElementById("player-score")
// grabs the target-value element
var targetValue = document.getElementById("target-value")
// Crystal values
function crystalNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Number to match generation
function targetNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Declare Crystal Values
var crysVal0 = crystalNumber(1, 12)
var crysVal1 = crystalNumber(1, 12)
var crysVal2 = crystalNumber(1, 12)
var crysVal3 = crystalNumber(1, 12)

var target = targetNumber(19, 120)


function setup() {
	$("#target-value").html("Required: " + target);
	$("#wins").html(0);
	$("#losses").html(0);
	playerScore = 0;
	scoreHolder.innerHTML = playerScore


	// Declare and display buttons
	for (var i = 0; i < 4; i++) {
		crystal = $("<img>");
		//crystal.attr("data-crysvalue", crystalValues[i]);
		crystal.addClass("crystal-img");
		crystal.attr("id", "c" + i)
		crystal.attr("src", crystalImage[i]);
		crystal.appendTo("#crystal-container");
	}

	$("#c0").attr("data-crysvalue", crysVal0)
	$("#c1").attr("data-crysvalue", crysVal1)
	$("#c2").attr("data-crysvalue", crysVal2)
	$("#c3").attr("data-crysvalue", crysVal3)

};
$(document).ready(setup());




//---------- Reset Function ----------//
function reset() {
	targetValue.innerHTML = "Required: " + target;
	playerScore = 0;
	scoreHolder.innerHTML = playerScore

	crysVal0 = crystalNumber(1, 12)
	crysVal1 = crystalNumber(1, 12)
	crysVal2 = crystalNumber(1, 12)
	crysVal3 = crystalNumber(1, 12)

	$("#c0").attr("data-crysvalue", crysVal0)
	$("#c1").attr("data-crysvalue", crysVal1)
	$("#c2").attr("data-crysvalue", crysVal2)
	$("#c3").attr("data-crysvalue", crysVal3)

	gameOverScreen.remove();
	resetButton.remove();
}

//---------- GameOver Screen/Reset Button ----------//
// If player wins this will appear
function gameOverGood() {
	var gameOverScreen = $("<div>")
	gameOverScreen.appendTo($(".container-fluid"))
	gameOverScreen.addClass("game-over")
	gameOverScreen.attr("id", "good")
	gameOverScreen.attr("id", "bad");
	gameOverScreen.html("<p>Uh-oh! It looks like you angered the shop keeper! Better get out of here fast!</p>");
	
	// Reset Button
	var resetButton = $("<button>");
	resetButton.attr("type", "button")
	resetButton.addClass("reset-button");
	resetButton.appendTo($(".game-over"));
	resetButton.html("Press here to play again!")

}

// If player loses this will appear
function gameOverBad() {
	var gameOverScreen = $("<div>");
	gameOverScreen.appendTo($(".container-fluid"));
	gameOverScreen.addClass("game-over");
	gameOverScreen.attr("id", "bad");
	gameOverScreen.html("<h2>GAME OVER</h2>" + "<p>Uh-oh! It looks like you angered the shop keeper! Better get out of here fast!</p>");
	
	// Reset Button
	var resetButton = $("<button>");
	resetButton.addClass("reset-button");
	resetButton.appendTo($(".game-over"));
	resetButton.html("Press here to play again!")
}

$("<button>").on("click", function() {
	reset();
});

//---------- Crystal click function ----------//
$(".crystal-img").on("click", function() {
	var crystalValue = ($(this).attr("data-crysvalue"));
	
	// We have to use parseInt because HTML attributes are strings
	crystalValue = parseInt(crystalValue);
	// We don't want any additional clicks to work if we reach this point
	if (playerScore === target || playerScore > target) {
		return;
	}
	
	// Game will proceed if playerScore has not exceeded or matched the target
	else {
		playerScore += crystalValue;
		scoreHolder.innerHTML = playerScore
		var getRupee = new Audio("assets/sounds/TP_Get_Rupee.wav")
		getRupee.play();

		if (playerScore === target) {
			var win = new Audio("assets/sounds/WW_Fanfare_TreasureChest.wav")
			win.play();	
			wins += 1;
			gameOverGood();
			$("#wins").html(wins)
			alert("You won!")

		}

		else if (playerScore > target) {
			var lose = new Audio("assets/sounds/WW_LargePot_Shatter.wav")
			lose.play();
			losses += 1;
			gameOverBad();
			$("#losses").html(losses);
		
		}
	}

});






