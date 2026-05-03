//1.music sheet lines across the page
//2. moving piano keys
//3. user interaction
//4. keyboard right/wrong if/else triggers audience
//5. trigger background color/stage anxiety
//6. end of performance

//rectangle length with variance, different sizes/lengths
//the more keys they press, more colorful the screen can become
//array, if the sound is playing, whenever htey press a key and if the key=correct, then generate a new item in the array, dispaly as a piano square
//reset
//pop-up music sheet, they only look at it for 10 secs, give instructions to memorize it
//"you have 10 seconds to memorize the music before the audience members take their seats"
//when they get it wrong, how frustrating should it be?
//if wrong, chaotic background, audience boos

let noteSounds = [];
let testSound;
let booSound;

let lines = [];

let notes = [];
let curP = 0;
let t = 200;
//webcam pixel manipulation: future feature
//let chars = ["♩", "♪", "♫", "♬", "♭", "♯"];

let chars2 = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function preload() {
  testSound = loadSound("crescendo_music.mp3");
  //noteSounds[i] = loadSound();
}
function setup() {
  let canvas = createCanvas(800, 500);
  frameRate(30);
  canvas.parent("p5-canvas-container");
  background(255, 200);
  //
  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(0, 50 + i * 10));
  }

  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(40, -90 + i * 2));
  }

  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(40, -90 + i * 20));
  }

  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(150, -150 + i * 12));
  }

  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(400, -200 + i * 15));
  }

  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(-190, 240 + i * 12));
  }
  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(-40, 200 + i * 8));
  }
  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(-40, 200 + i * 1));
  }

  //
  for (let i = 0; i < 30; i++) {
    let pX = i * 45;

    let colors = [
      "#F473A4",
      "#A8DA6E",
      "#44A1EB",
      "#FFEB3B",
      "#62DAE5",
      "#E06ED6",
      "#FFC107",
      "#CC5CE0",
      "#FFF06E",
      "#03A9F4",
      "#847DFC",
      "#8BC34A",
      "#F76C8B",
      "#99EBEB",
      "#F6A734",
      "#CDDC39",
      "#AF87FF",
      "#E36DEA",
    ];
    let col = colors[i % colors.length];

    notes.push(new KeyNote(random(100, 700), random(50, 200), pX, col));
  }

  for (let i = 0; i < notes.length; i++) {
    notes[i].display();
    notes[i].update();
  }
}

function draw() {
  background(255, 100);
  for (let i = 0; i < lines.length; i++) {
    lines[i].display();
  }

  fill(255, 40);
  noStroke();
  rect(0, 0, width, height);

  for (let i = 0; i < notes.length; i++) {
    notes[i].display();
    notes[i].update();

    //console.log(notes[i]);
  }

  textAlign(CENTER, CENTER);

  textFont("monospace");
  textStyle(BOLD);
  textSize(20);

  fill(0); // Main text color
  text(
    "Press the letters in the alphabet to start playing",
    width / 2,
    height / 2
  );
  fill("#A8DA6E"); // Using one of your green colors from your array

  text(
    "Press the letters in the alphabet to start playing",
    width / 2,
    height / 2
  );
}

//

class KeyNote {
  constructor(startX, startY, pianoX, col) {
    this.drawX = pianoX;
    this.drawY = 350;
    this.c = col;
    this.isPlayed = false;
    this.speedX = random(-1, 1);
    this.speedY = random(-3, -1);
  }
  update() {
    if (this.isPlayed) {
      // drawX = this.x + noise(frameCount * 0.02, this.y) * 50;
      // drawY = this.y + sin(frameCount * 0.1) * 30;
      if (this.drawX < 0 || this.drawX > width) {
        this.speedX = -this.speedX;
        // this.speedY = -this.speedY;
      } else if (this.drawY < 0 || this.drawY > height) {
        // this.speedX = this.speedX;
        this.speedY = -this.speedY;
      }
      this.drawX = this.drawX + this.speedX;
      this.drawY = this.drawY + this.speedY;
    }
  }
  display() {
    noStroke();
    fill(this.c);
    let len = map(noise(frameCount / 10 + this.drawX), 0, 1, 120, 200);
    //random(120, 200);
    let wid = map(noise(frameCount / 10 + this.speedX), 0, 1, 30, 40);
    //let wid = random(30, 40);
    // random(5, 50)
    let offsetY = map(noise(frameCount / 20 + this.drawX), 0, 1, 5, 80);
    rect(this.drawX, this.drawY - offsetY, wid, len);
  }
}

function keyPressed() {
  //   for (let i = 0; i < 0; i++) {
  //     let pX = i * 45;
  //     let colors = ["#FF3264", "#FFE600", "#00B4FF", "#FF7800"];
  //     let col = colors[i % 4];
  //     notes.push(new KeyNote(random(100, 700), random(50, 200), pX, col));
  //   }

  // Each key press snaps the next chaotic note into the piano line
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].isPlayed == false) {
      notes[i].isPlayed = true;
      break;
    }
  }

  if (!testSound.isPlaying()) {
    testSound.play();
  }
  //testSound.stop();

  // if played correct

  if (key === chars2[curP]) {
    testSound.rate(1.0);
    testSound.play();

    if (t < 200) {
      t += 50;
    } else {
      testSound.rate(0.6);
      //testSound.stop();
      testSound.play();
      t = 250;
    }

    // console.log("correct and go to next");
    // background(255, 100);
    curP = curP + 1;
  } else {
    if (t > 50) {
      t -= 50;
    } else {
      t = 40;
    }
    // console.log("wrong");
  }

  if (curP >= chars2.length) {
    curP = 0;
    // console.log("reset");
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
    stroke(75);
    strokeWeight(1.8);

    //line template
    beginShape();
    for (let i = 0; i < 150; i++) {
      let x = map(i, 0, 120, this.startX, this.endX);
      let y = map(i, 0, 120, this.startY, this.endY);

      let taper = sin(map(i, 0, 99, 0, PI));

      let d = dist(x, y, mouseX, mouseY);
      let mouseBoost = map(d, 0, 200, 50, 0);

      let vibrate = sin(i * 0.2 + frameCount * 0.15) * (50 + mouseBoost);

      vertex(x, y + vibrate * taper);
    }
    endShape();
  }
}
