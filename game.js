var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  function makeSound(randomChosenColour) {
    var soundFile = "sounds/" + randomChosenColour + ".mp3";
    var audio = new Audio(soundFile);
    audio.play();
  }
  makeSound(randomChosenColour);
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(colour) {
  var soundFiles = "sounds/" + colour + ".mp3";
  var audios = new Audio(soundFiles);
  audios.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keydown(function (event) {
  console.log("Key pressed: " + event.key);
});

var started = false; // Variable to track if the game has started

$(document).keydown(function () {
  if (!started) {
    // Check if the game has not started
    started = true; // Toggle started to true
    nextSequence(); // Call nextSequence()
    $("h1").text("Level " + 0);
  }
});

function checkAnswer(currentLevel) {
  // Compare the user's answer to the game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success!");

    // Check if the user has completed the sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence(); // Move to the next sequence after a short delay
        userClickedPattern = []; // Reset user's pattern for the next level
      }, 1000);
    }
  } else {
    console.log("Wrong!");
    playSound("wrong"); // Play the "wrong" sound
    $("h1").text("Game Over, Press Any Key to Restart"); // Update the title
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver(); // Restart the game
  }
}

function startOver() {
  level = 0; // Reset the level
  gamePattern = []; // Clear the game pattern
  userClickedPattern = []; // Clear the user's pattern
  started = false; // Allow restarting the game
}
