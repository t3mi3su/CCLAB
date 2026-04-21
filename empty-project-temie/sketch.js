//zoom into a music note when played? sound (black circle becominh bigger like u have entered it

//1.music sheet lines across the page
//2. moving piano keys
//3. user interaction
//4. keyboard right/wrong if/else triggers audience
//5. trigger background color/stage anxiety
//6. end of performance

let lines = [];

let notes = [];

//webcam pixel manipulation: future feature
//let chars = ["♩", "♪", "♫", "♬", "♭", "♯"];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  //
  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(0, 50 + i * 12));
  }

  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(150, -150 + i * 12));
  }

  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(-190, 240 + i * 12));
  }

  //
  for (let i = 0; i < 8; i++) {
    let pX = 150 + i * 45;

    let colors = ["#FF3264", "#FFE600", "#00B4FF", "#FF7800"];
    let col = colors[i % 4];

    notes.push(new KeyNote(random(100, 700), random(50, 200), pX, col));
  }
}

function draw() {
  background(255, 200);

  for (let i = 0; i < lines.length; i++) {
    lines[i].display();
  }

  fill(255, 40);
  noStroke();
  rect(0, 0, width, height);

  for (let i = 0; i < notes.length; i++) {
    notes[i].display();
  }
}

//

class KeyNote {
  constructor(startX, startY, pianoX, col) {
    this.x = startX;
    this.y = startY;
    this.pX = pianoX;
    this.c = col;
    this.isPlayed = false;
  }
  display() {
    let drawX, drawY;

    if (this.isPlayed) {
      drawX = this.pX;
      drawY = 350;
    } else {
      drawX = this.x + noise(frameCount * 0.02, this.y) * 50;
      drawY = this.y + sin(frameCount * 0.1) * 30;
    }

    noStroke();
    fill(this.c);
    rect(drawX, drawY, 40, 100);
  }
}

function keyPressed() {
  // Each key press snaps the next chaotic note into the piano line
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].isPlayed == false) {
      notes[i].isPlayed = true;
      break;
    }
  }
}
//
class MusicLine {
  constructor(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = startX + 1000;
    this.endY = startY + 500;
  }
  //??? not sure how to implement update
  update() { }

  display() {
    noFill();
    stroke(100);
    strokeWeight(3);

    //line template
    beginShape();
    for (let i = 0; i < 150; i++) {
      let x = map(i, 0, 120, this.startX, this.endX);
      let y = map(i, 0, 120, this.startY, this.endY);

      let taper = sin(map(i, 0, 99, 0, PI));

      let d = dist(x, y, mouseX, mouseY);
      let mouseBoost = map(d, 0, 150, 30, 0);

      let vibrate = sin(i * 0.2 + frameCount * 0.05) * (30 + mouseBoost);

      vertex(x, y + vibrate * taper);
    }
    endShape();
  }
}
