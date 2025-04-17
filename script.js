
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

let catImg = new Image();
catImg.src = "cat.png";

let bgImages = ["jungle.png", "snow.png"];
let bgIndex = 0;
let bgImg = new Image();
bgImg.src = bgImages[bgIndex];

let cat = {
    x: 50,
    y: height - 150,
    width: 80,
    height: 80,
    vy: 0,
    gravity: 1,
    jumpPower: -20,
    grounded: true
};

let obstacles = [];
let frames = 0;
let distance = 0;

function createObstacle() {
    obstacles.push({
        x: width,
        y: height - 100,
        width: 30,
        height: 50
    });
}

function drawCat() {
    ctx.drawImage(catImg, cat.x, cat.y, cat.width, cat.height);
}

function drawObstacles() {
    ctx.fillStyle = "green";
    obstacles.forEach(ob => {
        ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
    });
}

function drawBackground() {
    ctx.drawImage(bgImg, 0, 0, width, height);
}

function update() {
    frames++;
    distance += 5;

    if (frames % 100 === 0) {
        createObstacle();
    }

    cat.vy += cat.gravity;
    cat.y += cat.vy;

    if (cat.y > height - 150) {
        cat.y = height - 150;
        cat.vy = 0;
        cat.grounded = true;
    }

    obstacles.forEach(ob => {
        ob.x -= 5;
    });

    obstacles = obstacles.filter(ob => ob.x + ob.width > 0);

    if (distance >= 1000 * (bgIndex + 1)) {
        bgIndex = (bgIndex + 1) % bgImages.length;
        bgImg.src = bgImages[bgIndex];
    }
}

function loop() {
    ctx.clearRect(0, 0, width, height);
    drawBackground();
    drawObstacles();
    drawCat();
    update();
    requestAnimationFrame(loop);
}

window.addEventListener('keydown', function(e) {
    if (e.code === "Space" && cat.grounded) {
        cat.vy = cat.jumpPower;
        cat.grounded = false;
    }
});

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});

catImg.onload = () => {
    loop();
};
