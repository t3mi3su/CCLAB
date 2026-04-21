/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let x, y;
let targetX, targetY;
let foundTarget = true;
let speed = 2.5;
let stress = 0;
let bgAwareness = 0; 
let dangerX = 300, dangerY = 250; 
let s = 8; 
let intersectingWithDanger = false;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container");
  x = width / 2;
  y = height / 2;
  targetX = x;
  targetY = y;
  colorMode(HSB, 350, 80, 90, 100);
}

function draw() {
  // grid background
  drawVisceralBackground();

  // background eyes
  drawNarrativeEyes();

  noStroke();
  // danger
  fill(0, 100, 80, bgAwareness * 0.4); 
  circle(dangerX, dangerY, 60);

  // creature logic
  let dToDanger = dist(x, y, dangerX, dangerY);

  if (dToDanger < 100 && bgAwareness > 15) {
    let fleeX = x - dangerX;
    let fleeY = y - dangerY;
    x += fleeX * 0.10;
    y += fleeY * 0.10;
    stress = 150;
    foundTarget = true;
  } else if(foundTarget == false) {
    let xDistance = targetX - x;
    let yDistance = targetY - y;
    x += xDistance * 0.02 * speed;
    y += yDistance * 0.02 * speed;
    if (dist(x, y, targetX, targetY) < 2) 
      foundTarget = true;
  } else {
    x += map(noise(frameCount / 10), 0, 1, -speed, speed);
    y += map(noise(frameCount / 10 + 20), 0, 1, -speed, speed);
  }

  x = constrain(x, 100, 700);
  y = constrain(y, 80, 420);

  if (stress > 0) stress -= 2;

  // sound Waves using noise shape
  drawSoundWaves(targetX, targetY);
  
  push();
  translate(x, y);
  if (stress > 0) translate(random(-2, 2), random(-2, 2)); // shivering
  drawBody();
  drawArms(stress);
  drawEye(x, y, stress); // blind eye
  pop();
}

function drawVisceralBackground() {
  background(280, 90, 5); 
  for (let bx = s / 2; bx < width; bx += s) {
    for (let by = s / 2; by < height; by += s) {
      let noiseVal = noise(bx / 50 + frameCount / 100, by / 500 + frameCount / 100);
      let baseHue = map(bx, 0, width, 320, 350); 
      let s2 = map(noiseVal, 0, 1, 0, 2 * s);
      let brite = map(noiseVal, 0, 1, 15, 45);
      fill(baseHue, 90, brite);
      noStroke();
      circle(bx, by, s2);
    }
  }
}

function drawNarrativeEyes() {
  for (let bgx = 60; bgx < width; bgx += 150) {
    for (let bgy = 60; bgy < height; bgy += 150) {
      let offset = (bgx + bgy);
      let eyeOpen = map(bgAwareness, 0, 100, 0, 30, true);
      let blink = map(sin(frameCount * 0.05 + offset), -1, 1, 0, eyeOpen);

      if (blink > 3) {
        // sockets
        fill(0, 0, 100, bgAwareness); 
        noStroke();
        ellipse(bgx, bgy, 55, blink);
        
        // parasite pupils tracking the creature
        let pOffset_X = constrain((x - bgx) * 0.05, -6, 6);
        let pOffset_Y = constrain((y - bgy) * 0.05, -3, 3);
        
        fill(0, 0, 0, bgAwareness);
        let pupilH = blink * 0.6; // height with eyelid
        ellipse(bgx + pOffset_X, bgy + pOffset_Y, 20, pupilH);
      }
    }
  }
  bgAwareness = max(0, bgAwareness - 0.4);
}

function drawSoundWaves(mx, my) {
  if (bgAwareness < 2) 
    return; 
  push();
  noFill();
  for (let i = 0; i < 3; i++) {
    let r = (frameCount * 2 + i * 50) % 150;
    let fade = map(r, 0, 150, 40, 0);
    stroke(0, 100, 100, fade); // Red waves
    strokeWeight(2);

    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.2) {
      let n = noise(cos(a) + 1, sin(a) + 1, frameCount * 0.05 + i);
      let offset = n * 25;
      let vx = mx + (r + offset) * cos(a);
      let vy = my + (r + offset) * sin(a);
      vertex(vx, vy);
    }
    endShape(CLOSE);
  }
  pop();
}

function drawBody() {
  noStroke();
  fill(220, 15, 95, 25); 
  ellipse(0, 0, 160, 140);
}

function drawArms(s) {
  stroke(240, 30 + s * 0.3, 50, 60);
  strokeWeight(6);
  noFill();
  for (let i = 0; i < 12; i++) {
    push();
    rotate((TWO_PI / 12) * i);
    let wave = sin(frameCount * 0.08 + i) * 12;
    let len = 70 + wave + s * 0.3;
    bezier(0, 30, 15, 40, -15, 40, 0, len);
    pop();
  }
}

function drawEye(curX, curY, s) {
  let blink = map(sin(frameCount * 0.05), -1, 1, 0, 65);
  
  // blind color
  fill(0, s * 0.5, 200);
  stroke(0);
  strokeWeight(3);
  ellipse(0, 0, 110, blink);

  if (blink > 15) {
    push();
    let tx = constrain((mouseX - curX) * 0.01, -18, 18);
    let ty = constrain((mouseY - curY) * 0.01, -8, 8);
    translate(tx, ty);

    noStroke();
    fill(0, 0, 30, 60); //iris
    ellipse(0, 0, 45, blink * 0.6); 
    
    fill(0, 0, 100, 70); //center of eye
    ellipse(0, 0, 25, blink * 0.4); 
    pop();
  }
}

function mousePressed() {
  targetX = mouseX;
  targetY = mouseY;
  foundTarget = false;
  bgAwareness = 100; 
}