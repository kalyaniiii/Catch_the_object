const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let basket = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 50,
    width: 100,
    height: 20,
    speed: 5,
    dx: 0
};

let fallingObject = {
    x: Math.random() * (canvas.width - 20),
    y: 0,
    size: 20,
    speed: 2
};

let score = 0;

function drawBasket() {
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawFallingObject() {
    ctx.beginPath();
    ctx.arc(fallingObject.x, fallingObject.y, fallingObject.size, 0, Math.PI * 2);
    ctx.fillStyle = '#ff4500';
    ctx.fill();
    ctx.closePath();
}

function moveBasket() {
    basket.x += basket.dx;

    if (basket.x < 0) {
        basket.x = 0;
    }
    
    if (basket.x + basket.width > canvas.width) {
        basket.x = canvas.width - basket.width;
    }
}

function moveFallingObject() {
    fallingObject.y += fallingObject.speed;

    if (fallingObject.y + fallingObject.size > canvas.height) {
        fallingObject.y = 0;
        fallingObject.x = Math.random() * (canvas.width - fallingObject.size);
    }
}

function checkCollision() {
    if (
        fallingObject.y + fallingObject.size > basket.y &&
        fallingObject.x > basket.x &&
        fallingObject.x < basket.x + basket.width
    ) {
        score++;
        fallingObject.y = 0;
        fallingObject.x = Math.random() * (canvas.width - fallingObject.size);
    }
}

function update() {
    moveBasket();
    moveFallingObject();
    checkCollision();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBasket();
    drawFallingObject();

    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 20, 30);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        basket.dx = basket.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        basket.dx = -basket.speed;
    }
}

function keyUp(e) {
    if (
        e.key === 'ArrowRight' ||
        e.key === 'Right' ||
        e.key === 'ArrowLeft' ||
        e.key === 'Left'
    ) {
        basket.dx = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

loop();
