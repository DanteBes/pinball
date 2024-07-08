let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let posX = 10;
let vectr = 0;
let speedX = 1;
let posY = 30;
let speedY = 1;
let ballSpeed = 2;
let ballRadius = 10;
let ballColor = 'rgb(' + Math.floor(100 + Math.random() * 156) + ',' +
  Math.floor(100 + Math.random() * 156) + ',' +
  Math.floor(100 + Math.random() * 156) + ')';

let paddleheight = 10;
let paddlewidth = 75;
let paddlex = (canvas.width - paddlewidth) / 2;

let leftPressed = false;
let leftPressed1 = false;
let leftPressed2 = false;
let rightPressed = false;
let rightPressed1 = false;
let rightPressed2 = false;

let score = 0; // счетчик попаданий

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  }
  if (e.keyCode == 37) {
    leftPressed = true;
  }
}

const ctrl_slider = document.querySelector("#ctrl_slider")
ctrl_slider.addEventListener("input", (event) => {
  if (event.target.value >= 1) {
    rightPressed = true;
    rightPressed1 = false;
    rightPressed2 = false;
    leftPressed = false;
    leftPressed1 = false;
    leftPressed2 = false;
  }
  if (event.target.value >= 2) {
    rightPressed = false;
    rightPressed1 = true;
    rightPressed2 = false;
    leftPressed = false;
    leftPressed1 = false;
    leftPressed2 = false;
  }
  if (event.target.value >= 3) {
    rightPressed = false;
    rightPressed1 = false;
    rightPressed2 = true;
    leftPressed = false;
    leftPressed1 = false;
    leftPressed2 = false;
  }
  if (event.target.value <= -1) {
    rightPressed = false;
    rightPressed1 = false;
    rightPressed2 = false;
    leftPressed = true;
    leftPressed1 = false;
    leftPressed2 = false;
  }
  if (event.target.value <= -2) {
    rightPressed = false;
    rightPressed1 = false;
    rightPressed2 = false;
    leftPressed = false;
    leftPressed1 = true;
    leftPressed2 = false;
  }
  if (event.target.value <= -3) {
    rightPressed = false;
    rightPressed1 = false;
    rightPressed2 = false;
    leftPressed = false;
    leftPressed1 = false;
    leftPressed2 = true;
  } if (event.target.value < 1 && event.target.value > -1) {
    rightPressed = false;
    rightPressed1 = false;
    rightPressed2 = false;
    leftPressed = false;
    leftPressed1 = false;
    leftPressed2 = false;
  }
})

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  }
  if (e.keyCode == 37) {
    leftPressed = false;
  }
}

function drawPaddlex() {
  ctx.beginPath();
  ctx.rect(paddlex, canvas.height - paddleheight, paddlewidth, paddleheight);
  ctx.fillStyle = "#CFF651";
  ctx.fill();
  ctx.closePath();
}

function personageBall() {
  if (posY + speedY > canvas.height) {
    speedY = -1 * ballSpeed;
    score = 0;
    ballSpeed = 1;
  } else if (posX + speedX > canvas.width) {
    speedX = -1 * ballSpeed;
  } else if (posX + speedX < 0) {
    speedX = 1 * ballSpeed;
  } else if (posY + speedY < 0) {
    speedY = 1 * ballSpeed;
  } else if (posY + speedY > canvas.height - paddleheight - ballRadius && posX > paddlex && posX < paddlex + paddlewidth) {
    score++;
    speedY = -1 * ballSpeed;
    ballColor = 'rgb(' + Math.floor(100 + Math.random() * 156) + ',' +
      Math.floor(100 + Math.random() * 156) + ',' +
      Math.floor(100 + Math.random() * 156) + ')'
    ballSpeed += 0.05
  }

  if (rightPressed && paddlex < canvas.width - paddlewidth) {
    paddlex += 3;
  }
  if (leftPressed && paddlex > 0) {
    paddlex -= 3;
  }
  if (rightPressed1 && paddlex < canvas.width - paddlewidth) {
    paddlex += 7;
  }
  if (leftPressed1 && paddlex > 0) {
    paddlex -= 7;
  }
  if (rightPressed2 && paddlex < canvas.width - paddlewidth) {
    paddlex += 10;
  }
  if (leftPressed2 && paddlex > 0) {
    paddlex -= 10;
  }

  ctx.beginPath();
  ctx.arc(posX, posY, ballRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

var lootBoxes = []
function creatLootBox() {
  var lootBox = {
    x: Math.random() * canvas.width,
    y: -10,
    width: 20,
    height: 20,
    speed: Math.random() * 3 + 3
  }
  lootBoxes.push(lootBox)
}

function drawLootBoxes() {
  for (var i = 0; i < lootBoxes.length; i++) {
    var lootBox = lootBoxes[i];
    ctx.beginPath();
    ctx.rect(lootBox.x - lootBox.width, lootBox.y, lootBox.width, lootBox.height);
    ctx.fillStyle = "#9ab";
    ctx.fill();
    ctx.closePath();
    lootBox.y += lootBox.speed;
  }
}
setInterval(creatLootBox, 5000)

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#FFFFFF";
  let scoreText = score.toString().padStart(3, '0');
  object_counter.textContent = scoreText;
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddlex();
  personageBall();
  drawLootBoxes();
  drawScore();
  posX += speedX;
  posY += speedY;
}
let drawInterval = setInterval(draw, 1000 / 90);



const object_counter = document.querySelector(".object_counter");



//-----
function openInfo() {
  document.querySelector(".info_box").classList.toggle('hidden')
}
