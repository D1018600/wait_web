const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

let td = 0;

class Ball {
    constructor(x, y, velX, velY, color, size, damage) {
        this.x = x;  // 球的 x 軸座標
        this.y = y;  // 球的 y 軸座標
        this.velX = velX;  // 球在 x 軸上的速度
        this.velY = velY;  // 球在 y 軸上的速度
        this.color = color;  // 球的顏色
        this.size = size;  // 球的大小
        this.damage = damage;
    }

    draw() {
        ctx.beginPath();

        ctx.moveTo(this.x,this.y);
        ctx.quadraticCurveTo(this.x+25/2,this.y,this.x+25/2,this.y+15/2);
        ctx.quadraticCurveTo(this.x+25/2,this.y+30/2,this.x,this.y+30/2);
        ctx.quadraticCurveTo(this.x-45/2,this.y+30/2,this.x-45/2,this.y+15/2);
        ctx.quadraticCurveTo(this.x-45/2,this.y+5/2,this.x,this.y);

        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        if (this.x + this.size > width-width/3.5) {
            this.x = width/3;
            this.y = 150;
            td += this.damage;
        }
    }
}

const ball = new Ball(
    width/3,
    150,
    4,
    0,
    'rgb(256, 256, 256)',
    10,
    70
);

text = 'Wait for a minute...';

function loop() {
    window.addEventListener('resize', resizeCanvas);
    ctx.fillStyle = 'rgba(27, 40, 54, 1)';
    ctx.fillRect(0, 0, width, height);

    ball.draw();
    ball.update();
    ball.collisionDetect();

    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(text, width/2.5, 50);
    ctx.fillText("total damage " + td + " (" + Math.floor((td/6000)*100) + "%" + ")", width/2.5, 280);

    if (td > 6000) {
        td = 0;
    }

    ctx.fillText("當前傷害: " + ball.damage + " 當前攻速: " + ball.velX, width/2.5, 330);
    requestAnimationFrame(loop);
}

const b1 = document.querySelector(".button.b1");
const b2 = document.querySelector(".button.b2");
const b3 = document.querySelector(".button.b3");
const b4 = document.querySelector(".button.b4");

b1.addEventListener("click", function() {
    if (ball.damage < 200) {
        ball.damage += 10;
    }
});

b3.addEventListener("click", function() {
    if (ball.damage > 70) {
        ball.damage -= 10;
    }
});

b2.addEventListener("click", function() {
    if (ball.velX < 20) {
        ball.velX += 2;
    }
});

b4.addEventListener("click", function() {
    if (ball.velX > 4) {
        ball.velX -= 2;
    }
});

loop();
