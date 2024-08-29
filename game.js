var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

// use jQuery to detect when any of the buttons are clicked and trigger a handler function
$('.btn').click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);

  animatePress("#" + userChosenColour);
  
  checkAnswer(userClickedPattern.length - 1);
 
});


function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  
  level ++;
  $("#level-title").text("Level "+level);

  var randomChosenColour = buttonColours[randomNumber];

  // add the new randomChosen color to the end of gamePattern
  gamePattern.push(randomChosenColour);

  // jQuery to select the button with the same id as the randomChosenColour
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
  
  // use javascript to play the sound for the button colour selected
  playSound(randomChosenColour);
  console.log(gamePattern)
  
}
// remove

var started = false;
$(document).keydown(function (e) { 
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;  

  }
  
});
// play sound on next sequence and user click fxn
function playSound(name){
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();

}

// animating the button clicked function
function animatePress(currentColour){
  $(currentColour).addClass("pressed");

  setTimeout(function(){
    $(currentColour).removeClass("pressed");
  }, 100)
}

// check answer function
function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      // call nextSequence() after 1000 millisecond delay
      setTimeout(function () {
        nextSequence();
        

      }, 1000)
    }
  }else{
    playSound("wrong");
    console.log('wrong');
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)

    startOver();
  }
}


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}