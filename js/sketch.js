let scoreLeft = 0;
let scoreRight = 0;

let paddleLeft;
let paddleRight;

let ball = {
    x: 0,
    y: 0,
    speedX: 10,
    speedY: 0,
    radius: 40
}



function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    rectMode(CENTER);
    noStroke();

    ball.x = width / 2;
    ball.y = height / 2;
    
    paddleLeft = new Paddle(30, height / 2, 30, 150, 'vertical', true, '');
    paddleRight = new Paddle(width-30, height / 2, 30, 150, 'vertical', true, '');

}

function draw() {
    background(0);
    drawStadium();
    paddleLeft.show();  
    paddleLeft.move();
    paddleRight.show();
    paddleRight.move();
}

function drawStadium() {
    
    // 

    // Score
    textSize(100);
    textAlign(RIGHT)
    text(scoreLeft, width / 2 - 40, 100);
    textAlign(LEFT)
    text(scoreRight, width/2 + 40 , 100);

    // Net
    for (let y = 0; y < height; y = y + 30) {
        rect(width / 2, y, 20, 20);
    }
}

function bounceBall() {
    // Detection de collision Paddle Right
    if (ball.x >= paddleRight.x - paddleRight.width * 2 &&
        ball.y >= paddleRight.y - paddleRight.height / 2 &&
        ball.y <= paddleRight.y + paddleRight.height / 2) {
        ball.speedX = -ball.speedX;
        ball.speedY = random(-5, 5);
    }

    // Detection de collision Paddle Left 
    if (ball.x <= paddleLeft.x + paddleLeft.width * 2 &&
        ball.y >= paddleLeft.y - paddleLeft.height / 2 &&
        ball.y <= paddleLeft.y + paddleLeft.height / 2) {
        ball.speedX = -ball.speedX;
        ball.speedY = random(-5, 5);
    }

    // Detection collision "murs" haut et bas
    if (ball.y <= ball.radius || ball.y >= height - ball.radius) {
        ball.speedY = -ball.speedY;
    }

    if (ball.x > width) {
        resetBall('left');
        scoreLeft += 1;
    } else if (ball.x < 0) {
        resetBall('right');
        scoreRight += 1;
    }
}

function movePaddle() {
    paddleRight.y = mouseY;
    paddleLeft.y = mouseX;
}

function moveBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;
}

function resetBall() {
    ball.x = width / 2;
    ball.y = height / 2;
    ball.speedX = -ball.speedX;
    ball.speedY = random(-2, 2);

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
        rect(this.x, this.y, this.width, this.height);
    }

    move() { 
        if (this.direction === 'horizontal') {
            if (this.mouse) {
                this.x = mouseX;
            } else if (keyIsDown(this.key)){ 
                this.x += 1;
            }
        } else if (this.direction === 'vertical') { 
            if (this.mouse) {
                this.y = mouseY;
            } else if (keyIsDown(this.key)) { 
                this.y+=1;
            }
        }
    }
}

class Ball {
    constructor(_x, _y, _radius) {
        this.x = _x;
        this.y = _y;
        this.radius = _radius;
    }
    show() { 

    }
    move() { 

    }
    bounce() { 

    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    setup();
}