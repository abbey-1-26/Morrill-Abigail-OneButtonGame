function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

let clicks = 0;
let gameOver = false;
let faces = []; // store all face data
let restartButton; // button to restart

function setup() {
  createCanvas(400, 400);
  // create button
  restartButton = createButton("Play Again?");
  restartButton.position(10, height + 10);
  restartButton.mousePressed(resetGame);
}

function draw() {
  background(220);

  // update and draw all faces
  for (let i = 0; i < faces.length; i++) {
    let f = faces[i];

    // move face
    f.x += f.vx;
    f.y += f.vy;

    // bounce off edges
    if (f.x < 50 || f.x > width - 50) f.vx *= -1;
    if (f.y < 50 || f.y > height - 50) f.vy *= -1;

    // pulsate size
    f.size += f.growth;
    if (f.size > 120 || f.size < 80) f.growth *= -1;

    drawFace(f);
  }

  // show clicks "click count"
  fill(0);
  textSize(20);
  text("joy count: " + clicks, 10, 25);

  // game over
  if (gameOver) {
    textSize(30);
    text("ARE YOU HAPPY YET?", 50, 200);
    noLoop(); // stop the draw loop
  }
}

// draw face using face object // working... progresss
function drawFace(f) {
  fill(f.faceColor);
  circle(f.x, f.y, f.size); // face

  fill(f.leftEyeColor);
  circle(f.x - f.size/5, f.y - f.size/5, f.size/10); // left eye

  fill(f.rightEyeColor);
  circle(f.x + f.size/5, f.y - f.size/5, f.size/10); // right eye

  stroke(f.smileColor);
  strokeWeight(2);
  noFill();
  arc(f.x, f.y, f.size/2, f.size/6, 0, PI); // smile
  noStroke();
}

// mouse click
function mousePressed() {
  if (gameOver) return;

  // create random colors
  let faceColor = color(random(255), random(255), random(255));
  let leftEyeColor = color(random(255), random(255), random(255));
  let rightEyeColor = color(random(255), random(255), random(255));
  let smileColor = color(random(255), random(255), random(255));

  // create random velocity and size growth
  let vx = random(-2, 2);
  let vy = random(-2, 2);
  let size = random(80, 100);
  let growth = random(0.5, 1);

  // save face object
  faces.push({
    x: mouseX,
    y: mouseY,
    vx: vx,
    vy: vy,
    size: size,
    growth: growth,
    faceColor: faceColor,
    leftEyeColor: leftEyeColor,
    rightEyeColor: rightEyeColor,
    smileColor: smileColor
  });

  clicks++;

  if (clicks >= 10) {
    gameOver = true;
  }
}

// restart function
function resetGame() {
  clicks = 0;
  gameOver = false;
  faces = [];
  loop(); // restart draw loop
}
