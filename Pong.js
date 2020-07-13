import Paddle from './Paddle';
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Para el responsive resizing de la pantalla 
/*
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
*/
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerOneUp = false;
let playerOneDown = false;
let playerTwoUp = false;
let playerTwoDown = false;
//Game states
//let startGame = true;
//let gamePause = false;
//let gameOver = false;
//----Initializing actors

let paddle1 = {
x: 10,
y: canvas.height / 5,
width: 10,
height: 50
};

let paddle2 = {
x: 1280,
y: canvas.height / 5,
width: 10,
height: 50
};
let ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    rad: 5,
    xspeed: 5,
    yspeed: 3
};
//Players Score
let sP1 = 0;
let sP2 = 0;
//Starting game
window.onload = function() {
mainLoop();
};
function mainLoop() {
    //Here I tried to set pause to the game
   /* if(gamePause == false) {

    }
    */
    draw();
    act();
    requestAnimationFrame(mainLoop);
    //ctx.canvas.width = width;
    //ctx.canvas.height = height;
}

function draw() {
//draw background
ctx.fillStyle = "blue";
ctx.fillRect(0,0,canvas.width,canvas.height);

    //draw paddle 1
    ctx.fillStyle = "black";
    ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
//draw paddle 2
    ctx.fillStyle = "red";
    ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
//draw ball
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.rad,0,2*Math.PI,true);
    ctx.fill();
//draw scores
    ctx.fontFamily = "Verdana";
    ctx.strokeStyle = "green";
    ctx.strokeText("Player 1: " + sP1 + " Player 2: " + sP2,canvas.width/2,10);
    //controling game states
   /* if(gameOver) {
        startGame = false;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.strokeStyle = "red";
        ctx.strokeText("GAME OVER",canvas.width/2,canvas.height/2);
    } */
}
function act() {
    //moving the ball
ball.x += ball.xspeed;
ball.y += ball.yspeed;
//bouncing ball (NEEDS REFACTORING )
if(ball.x > (canvas.width - ball.rad) || ball.x < ball.rad) {
    //gameOver = true;
    console.log('Outside');
}

if(ball.y > (canvas.height - ball.rad) || ball.y < ball.rad) {
    ball.yspeed *= -1;
}
//detecting collision (THERE'S A BUG HERE ABOUT THE UPPER AND BOTTOM EDGES OF THE PADDLES )
    if((ball.x + ball.rad) >= paddle2.x) {
        if(paddle2.y <= ball.y && paddle2.y + paddle2.height >= ball.y) {
            ball.xspeed *= -1;
        }
    }
    if(ball.x - ball.rad <= paddle1.x + paddle1.width) {
        if(paddle1.y <= ball.y && paddle1.y + paddle1.height >= ball.y) {
            ball.xspeed *= -1;
        }
    }
// detecting if the key are been pressed
    if(playerTwoUp) {
        paddle2.y += 5;
    }

    if(playerTwoDown) {
        paddle2.y -= 5;
    }
    if(playerOneDown) {
    paddle1.y += 5;
    }
    if(playerOneUp) {
    paddle1.y -= 5;
    }
    //setting boundaries to the paddles
    if(paddle2.y + paddle2.height >= canvas.height) {
    paddle2.y = canvas.height - paddle2.height;
    } else if(paddle2.y <= 0) {
    paddle2.y = 0;
    }
    if(paddle1.y + paddle1.height >= canvas.height) {
    paddle1.y = canvas.height - paddle1.height;
    } else if(paddle1.y <= 0) {
    paddle1.y = 0;
    }

}
//Controlling the keyboard events to move the paddles
document.onkeypress = function (event) {
    console.log(event.keyCode);
    
    if(event.keyCode === 115) {
        playerOneDown = true;
        playerOneUp = false;
        }
    if(event.keyCode === 119) {
        playerOneUp = true;
        playerOneDown = false;
    }
    if(event.keyCode === 53) {
        playerTwoUp = true;
        playerTwoDown = false;
    }
    if(event.keyCode === 56) {
        playerTwoDown = true;
        playerTwoUp = false;
    }
};
document.onkeyup = function(event) {

 if(event.keyCode === 115) {
     playerOneDown = false;
}
 if(event.keyCode === 119) {
    playerOneUp = false;
}
 if(event.keyCode === 53) {
    playerTwoUp = false;
}
 if(event.keyCode === 56) {
    playerTwoDown = false;
}
};