// TODO: 
// - Add text where is p1 and p2
// - Add a button where open the rules


let ctx = ca.getContext("2d");
let pointP1 = document.getElementById("pointP1");
let pointP2 = document.getElementById("pointP2");
let player1 = 200;
let player2 = 200;
let key = {};
let ball = {
    x: 360,
    y: 240,
    speedX: 3,
    speedY: 0,
};
let intervalId;
let playerOneName = "";
let playerTwoName = "";


document.addEventListener("keydown", e => key[e.keyCode] = true)
document.addEventListener("keyup", e => key[e.keyCode] = false)

draw();

function draw() {
    ctx.clearRect(0, 0, ca.width, ca.height)
    ctx.fillStyle = "white";
    ctx.fillRect(10, player1, 10, 80);
    ctx.fillRect(700, player2, 10, 80);
    ctx.fillRect(ball.x, ball.y, 10, 10);
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(360, 0);
    ctx.lineTo(360, 480);
    ctx.stroke();
    requestAnimationFrame(draw);
}


function loop() {
    if (key[38]) player2 = player2 - 5
    if (key[40]) player2 = player2 + 5
    if (key[87]) player1 = player1 - 5
    if (key[83]) player1 = player1 + 5

    ball.x = ball.x + ball.speedX
    ball.y = ball.y + ball.speedY


    bounceFromPlayer()
    bounceFromBorder()
    playerOutOfCanvas()
    goal()
    gameOver()

}

function startGame() {
    intervalId = setInterval(loop, 1000 / 60)
}


function goal() {
    if (ball.x < 0) {
        ball = {
            x: 360,
            y: 240,
            speedX: 3,
            speedY: 0,
        };
        pointP2.textContent++
    }
    if (ball.x > 720) {
        ball = {
            x: 360,
            y: 240,
            speedX: 3,
            speedY: 0,
        };
        pointP1.textContent++
    }

}


function bounceFromPlayer() {
    if (ball.y < player1 + 80 && ball.y > player1 && ball.speedX < 0 && ball.x < 20) {
        ball.speedX = -ball.speedX;
        ball.speedY = (ball.y - player1 - 40) * 0.1;
    }
    if (ball.y < player2 + 80 && ball.y > player2 && ball.speedX > 0 && ball.x > 690) {
        ball.speedX = -ball.speedX;
        ball.speedY = (ball.y - player2 - 40) * 0.1;
    }
}

function bounceFromBorder() {
    if (ball.y < 0 || ball.y > 475) {
        ball.speedY = -ball.speedY;
    }
}

function playerOutOfCanvas() {
    if (player1 < 0) player1 = 0;
    if (player1 > 400) player1 = 400;
    if (player2 < 0) player2 = 0;
    if (player2 > 400) player2 = 400;
}

function gameOver() {
    if (pointP1.textContent == 5) {
        document.getElementById("whoWin").innerHTML = `${playerOneName} hat gewonnen`
        openDialog()
        clearInterval(intervalId);
    }
    if (pointP2.textContent == 5) {
        document.getElementById("whoWin").innerHTML = `${playerTwoName} hat gewonnen`
        openDialog()
        clearInterval(intervalId);
    }
}

function openDialog() {
    document.getElementById("dialog").style.display = "flex"
}

function closePlayerChoose() {
    document.getElementById("player_choose").style.display = "none"
    document.getElementById("start").style.backgroundColor = "transparent"
}

function addPlayerOne() {
    playerOneName = document.getElementById("playerOneName").value
    let playerOne = document.getElementById("playerOne")
    playerOne.innerHTML = playerOneName

}

function addPlayerTwo() {
    playerTwoName = document.getElementById("playerTwoName").value
    let playerTwo = document.getElementById("playerTwo")
    playerTwo.innerHTML = playerTwoName
}

function reload() {
    location.reload()
}



