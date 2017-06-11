var crystalValues;
var crystalImage;
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
// Declare Crystals
function declareCrystals() {
	crystalValues = [crystalNumber(1, 12), crystalNumber(1, 12), crystalNumber(1, 12), crystalNumber(1, 12)];
	crystalImage = ["assets/images/rupee-blue.png", "assets/images/rupee-green.png", "assets/images/rupee-purple.png", "assets/images/rupee-red.png"]
}
var replayButton;

function setup() {
	targetValue.innerHTML = targetNumber(19, 120)
	scoreHolder.innerHTML = playerScore
	declareCrystals();
	playerScore = 0;

	// Declare and display buttons
	for (var i = 0; i < crystalValues.length; i++) {
		crystal = $("<img>");
		crystal.attr("data-crysvalue", crystalValues[i]);
		crystal.addClass("crystal-img");
		crystal.attr("src", crystalImage[i]);
		crystal.appendTo("#crystal-container");
	}
}

$(document).ready(setup());



//---------- Crystal click function ----------//
$(".crystal-img").on("click", function() {
	var crystalValue = ($(this).attr("data-crysvalue"));
	
	// We have to use parseInt because HTML attributes are strings
	crystalValue = parseInt(crystalValue);
	playerScore += crystalValue;

	scoreHolder.innerHTML = playerScore
	
	if (playerScore == targetValue.innerHTML) {
		alert("You won!")
		wins += 1;
		$("#wins").html("Wins: " + wins)
		replayButton = $("<button>")
		replayButton.html("Press this button to replay!")
		replayButton.addClass("replay-button")
		$(".container-fluid").append(replayButton)
	}

	else if (playerScore > targetValue.innerHTML) {
		alert("Oh no! You went over the amount!")
		losses += 1;
		$("#losses").html("Losses: " + losses);
		replayButton = $("<button>")
		replayButton.html("Press this button to replay!")
		replayButton.addClass("replay-button")
		$(".container-fluid").append(replayButton)
	}

});

//---------- Replay Button On-click function ----------//
$(".replay-button").on("click", function() {
	setup();
	$(".replay-button").remove();
	console.log("hi")
})






