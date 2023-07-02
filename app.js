var buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickPattern = [];

var start = false;
var level = 0;

$(document).keypress(function () {
    if (!start) {
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);

    sound(userChosenColor);
    animate(userChosenColor);

    checkAnswer(userClickPattern.length - 1)
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {

        console.log("success");

        if (userClickPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {

        console.log("wrong");

        sound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        //2. Call startOver() if the user gets the sequence wrong.
        startOver();
    }
}

function nextSequence() {
    userClickPattern = [];
    level++;

    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4) + 1;
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

    sound(randomColor);

}
function sound(play) {
    var audio = new Audio("sounds/" + play + ".mp3");
    audio.play();
}

function animate(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    start = false;
}

