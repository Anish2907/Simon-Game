let buttonColors = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let count =0;


$(document).keydown(function(){
    if(level === 0){
        $("h1").text(`Level ${level}`);
        nextSequence();
    }
})

$(".btn").on("click",function(){
    let chosenColor = $(this).attr("id");
    userClickedPattern.push(chosenColor);
    playSound(chosenColor);
    animatePress(chosenColor);
    if(userClickedPattern[count] === gamePattern[count]){
        count +=1;
        if(userClickedPattern.length === gamePattern.length){
            checkAnswer(userClickedPattern.length-1);
        }
    }
    else{
        gameOver();
    }
   
}) 

function nextSequence(){
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level +=1;
    $("h1").text(`Level ${level}`);
}

function playSound(name){
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");

    setTimeout(function(){
        $(`#${currentColor}`).removeClass("pressed")
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        setTimeout(function(){
            nextSequence();
        },1000);
        userClickedPattern = [];
        count =0;
    }
    else{
        gameOver();
    }
}
function restartGame(){
    gamePattern = [];
    userClickedPattern = [];
    level =0;
    count =0;
}
function gameOver(){
    $("h1").text("Game over, press any key to restart");
    $("body").addClass("game-over");
    let sound = new Audio("sounds/wrong.mp3");
    sound.play();
    setTimeout(function(){
        $("body").removeClass("game-over");
    },2000);
    restartGame();
}