let scoreLeft = 0;
let scoreRight = 0;

let paddles = [];

let balls = [];


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    noStroke();

    let paddleLeft = new Paddle(30, height / 2, 30, 300, 'vertical', true, '');
    let paddleRight = new Paddle(width - 30, height / 2, 30, 300, 'vertical', true, '');
    let paddleTop = new Paddle(width / 2, 0, 300, 30, 'horizontal', true, '');
    let paddleBottom = new Paddle(width / 2, height - 30, 300, 30, 'horizontal', true, '');

    paddles.push(paddleLeft);
    paddles.push(paddleRight);
    paddles.push(paddleTop);
    paddles.push(paddleBottom);

    for (let i = 0; i < 5000; i += 1) {
        balls[i] = new Ball(width / 2, height / 2, 50, random(-10, 10));
    }

}

function draw() {
    background(0);
    drawStadium();

    for (let i = 0; i < paddles.length; i += 1) {
        paddles[i].show();
        paddles[i].move();
    }

    for (let i = 0; i < balls.length; i += 1) {
        balls[i].show();
        balls[i].move();
        balls[i].bounce();
        balls[i].score();
    }

}

function drawStadium() {

    fill(255);

    // Score
    textSize(100);
    textAlign(RIGHT)
    text(scoreLeft, width / 2 - 40, 100);
    textAlign(LEFT)
    text(scoreRight, width / 2 + 40, 100);

    // Net
    for (let y = 0; y < height; y = y + 30) {
        rect(width / 2, y, 20, 20);
    }
}

class Paddle {
    constructor(_x, _y, _width, _height, _direction, _mouse, _key) {
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
        this.direction = _direction;
        this.mouse = _mouse;
        this.key = _key;
    }
    show() {
        fill(255);
        noStroke();
        rect(this.x, this.y, this.width, this.height);
    }

    move() {
        if (this.direction === 'horizontal') {
            if (this.mouse) {
                this.x = mouseX;
            } else if (keyIsDown(this.key)) {
                this.x += 1;
            }
        } else if (this.direction === 'vertical') {
            if (this.mouse) {
                this.y = mouseY;
            } else if (keyIsDown(this.key)) {
                this.y += 1;
            }
        }
    }
}

class Ball {
    constructor(_x, _y, _radius, _speedX) {
        this.x = _x;
        this.y = _y;
        this.radius = _radius;
        this.speedX = _speedX;
        this.speedY = 0;
        this.distances = [];
        this.enabled = true;
    }

    show() {
        // stroke(255,255,255,30)
        fill(255, 255, 255, 30);
        ellipse(this.x, this.y, this.radius);
    }
    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    bounce() {
        // Check for bounce against paddles
        for (let i = 0; i < paddles.length; i += 1) {
            if (this.x + this.radius / 2 > paddles[i].x && this.x - this.radius / 2 < paddles[i].x + paddles[i].width &&
                this.y > paddles[i].y && this.y < paddles[i].y + paddles[i].height) {
                this.speedX = -this.speedX;
                this.speedY = random(-5, 5);
            }
        }

        // Check for bounce against edges
        if (this.y > height - this.radius / 2 || this.y < 0 + this.radius / 2) {
            this.speedY = -this.speedY;
        }
    }

    score() { 
        if (this.enabled && this.x < 0) {
            scoreRight += 1;
            this.enabled = false;
        } else if (this.enabled && this.x > width) { 
            scoreLeft += 1;
            this.enabled = false;
        }
    }

}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    setup();
}