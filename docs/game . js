
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let cat = {
    x: 50,
    y: 300,
    width: 40,
    height: 40,
    yVelocity: 0,
    jumping: false
};

let gravity = 1.5;
let obstacles = [];
let frame = 0;
let score = 0;
let backgroundStage = 0;
const backgrounds = ['#87CEEB', '#EDC9AF', '#228B22']; // آسمان، کویر، جنگل

function drawCat() {
    ctx.fillStyle = "orange";
    ctx.fillRect(cat.x, cat.y, cat.width, cat.height);
}

function drawObstacles() {
    ctx.fillStyle = "black";
    obstacles.forEach(ob => {
        ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
    });
}

function updateObstacles() {
    if (frame % 90 === 0) {
        obstacles.push({
            x: 800,
            y: 360,
            width: 20,
            height: 40
        });
    }
    obstacles.forEach(ob => ob.x -= 5);
    obstacles = obstacles.filter(ob => ob.x + ob.width > 0);
}

function checkCollision() {
    for (let ob of obstacles) {
        if (cat.x < ob.x + ob.width &&
            cat.x + cat.width > ob.x &&
            cat.y < ob.y + ob.height &&
            cat.y + cat.height > ob.y) {
            alert("Game Over! Score: " + score);
            document.location.reload();
        }
    }
}

function updateBackground() {
    backgroundStage = Math.floor(score / 1000) % backgrounds.length;
    ctx.fillStyle = backgrounds[backgroundStage];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateCat() {
    cat.y += cat.yVelocity;
    cat.yVelocity += gravity;

    if (cat.y > 300) {
        cat.y = 300;
        cat.jumping = false;
    }
}

function gameLoop() {
    frame++;
    score += 5;

    updateBackground();
    updateCat();
    drawCat();
    updateObstacles();
    drawObstacles();
    checkCollision();

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function(e) {
    if (e.code === "Space" && !cat.jumping) {
        cat.yVelocity = -20;
        cat.jumping = true;
    }
});

gameLoop();
