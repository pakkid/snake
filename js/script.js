const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScore = document.getElementById('finalScore');
const retryButton = document.getElementById('retryButton');
const closeButton = document.getElementById('closeButton');

const gridSize = 20;
let snake = [{ x: 300, y: 300 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let gameInterval;

const eatSound = new Audio('sounds/eat.mp3'); // Path to your eat sound file
const gameOverSound = new Audio('sounds/gameover.mp3'); // Path to your game over sound file

function startGame() {
    snake = [{ x: 300, y: 300 }];
    direction = { x: gridSize, y: 0 }; // Start moving right
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    gameOverScreen.classList.remove('visible');
    placeFood();
    gameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
    update();
    draw();
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 1;
        scoreDisplay.textContent = `Score: ${score}`;
        eatSound.play();
        placeFood();
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

function gameOver() {
    clearInterval(gameInterval);
    finalScore.textContent = `Score: ${score}`;
    gameOverSound.play();
    gameOverScreen.classList.add('visible');
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -gridSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: gridSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -gridSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: gridSize, y: 0 };
            break;
    }
});

startButton.addEventListener('click', startGame);
retryButton.addEventListener('click', startGame);
closeButton.addEventListener('click', () => {
    gameOverScreen.classList.remove('visible');
});