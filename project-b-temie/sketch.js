let musicianStories = [
  "hover over the music to begin",
  "inside this lost recital hall",

  "you’re a pianist backstage, about to perform for hundreds of people",
  "back when classical music halls were filled with living, breathing flesh and souls",
  "back when music still needed hands",
  "back when breath became air",
  "back when imperfection was a part of beauty",

  "the dusty air of the music hall",
  "the audience members settling into their seats",
  "the creaky rustles in the dark",
  "their whispers, murmurs, coughs",
  "the piano is already out there, waiting",
  "that low hum of a hundred people waiting for me to walk out there and perform",

  "'please turn off your cellphones'",
  "the announcement echoes once, then disappears",
  "the performance is about to begin",
  "the lights are dimming now",
  "the room is slowly becoming quiet",
  "im about to step out onto that stage in sixty seconds",

  "i can feel my heart beating so fast",
  "my fingers are starting to shake",
  "my hands don’t feel like mine",
  "my mouth is dry",
  "my sleeve is sticking to my wrist",
  "i cant do this",
  "i’m wiping my palms every thirty seconds, but they just won’t stay dry",
  "i'm waiting for something terrible to happen so i don't have to go out there",

  "just breath",
  "*deep inhale*",
  "*slow exhale*",
  "eyes closed",
  "ok...i can do this...i have to",
  "after months of practicing, i cant back out now",
  "is this how i play this part again? yes, no, wait, is it? no, im overthinking it.",
  "what if my hands freeze",
  "what if the first note comes out wrong",
  "what if i forget everything",
  "my chest is weighing down on me",
  "am i going to stumble on the crescendo?",
  "a musician's biggest fear: forgetting everything on stage",

  "a lost symphony",
  "before machines replaced hands",
  "before the world automated classical music performances",
  "before strings became screens",
  "we start to become one breath",
  "what did it feel like to truly play and create symphonies within these hallways",
  "can you hear our synchronized breathing...",
  "i feel the everyone's eyes glaring as my fingers touch each piano key",
  "what will a musician's life look like in a century? when everything is mechanical and perfect",
  "music played by humans, 1000 years ago",
  "the notes are fast, but i can hear my own heart beating faster",
  "if this becomes a dead art, who will keep it alive?",
  "music played by humans, one thousand years ago",
  "not perfect",
  "not generated",
  "alive",
];

let storyIndex = 0;
let symbolIndex = 0;
let noteIndex = 0;
let storyAlpha = 0;

let lines = [];
let particles = [];
//let clefs = ["𝄞", "𝄢", "𝄡"];
let symbols = [
  "♩",
  "♪",
  "‧₊˚♪",
  "♫",
  "𝄞₊˚",
  "♬⋆.˚",
  "𝄞⋆˚｡⋆",
  "⊹˚♬₊⋆",
  "♭",
  "♫⋆｡♪ ₊˚♬",
  "♪",
  "⋆𝄞",
  "♬",
  "𝄢‧₊˚♪",
  "𝄞₊˚⊹",
  "𝄞⨾♬",
  "♯",
  "♩", "♭", 
  "⋆.˚‧₊˚♪",
  "𝄞",
  "𝄢",
  "♬",
  "♫⋆｡♪",
  "♪⋆｡",
  "♯", 
  "♮",
  "♪°",
  "♬⋆｡",
  "♫˚",
  "♪", 
  "♫", 
  "♬",
  "♪₊˚",
  "♩‧₊˚",
  "♫ ⋆｡˚",
  "♬˙⋆",
  "♬⟡₊˚",
  "𝄞⟡⋆",
  "♩｡･:˚",
  "♪｡ﾟ",
  "♬‧₊˚",
  "♫⋆˚⟡˖",
  "𝄞₊˚.⋆",
  "♩⊹ ࣪ ˖",
  "♪",
  "♬⋆｡‧",
  "♫₊˚⊹",
  "𝄞⋆˙",
  "♮⋆˚",
];

//oscillator
let notes = [
  146.83,
  220.0,
  293.66,
  369.99,
  196.0,
  293.66,
  392.0,
  493.88,
  220.0,
  329.63,
  440.0,
  554.37,
  146.83,
  185.0,
  220.0,
  293.66,
];

let audienceSound;
let isAudienceListening = false;

function preload() {
  audienceSound = loadSound("audience_waiting.mp3");
}
function toggleAudience() {
  isAudienceListening = !isAudienceListening;
  if (isAudienceListening) {
    audienceSound.loop();
    audienceSound.setVolume(0.2, 2.0); // fade in over 2 seconds
  } else {
    audienceSound.setVolume(0, 2.0); // fade out
  }
}

function mousePressed() {
  //the current symbol from the list

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let char = symbols[symbolIndex];

    particles.push(new Particle(mouseX, mouseY, char));

    //move to the next symbol for next time
    symbolIndex = symbolIndex + 1;

    //go back to 0
    if (symbolIndex >= symbols.length) {
      symbolIndex = 0;
    }
  }
}

function setup() {
  let canvas = createCanvas(800, 500);
  frameRate(30);
  canvas.parent("p5-canvas-container");

  background(255);
  //
  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(0, -50 + i * 3));
  }
  for (let i = 0; i < 10; i++) {
    lines.push(new MusicLine(-40, -200 + i * 60));
  }

  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(-40, -100 + i * 10));
  }
  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(150, -200 + i * 11));
  }

  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(420, -100 + i * 10));
  }
  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(-190, 240 + i * 10));
  }
  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(-40, 200 + i * 12));
  }
  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(0, 420 + i * 3));
  }
  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(2, 150 + i * 10));
  }

  //right corner
  for (let i = 0; i < 5; i++) {
    lines.push(new MusicLine(-580, 0 + i * 5));
  }

  //button for audience sounds
  btn = createButton("𝄞 listen to the hall waiting ♪");
  btn.parent("p5-canvas-container");
  //btn.position(266, 440);
  btn.style("background", "transparent");
  btn.style("border", "none");
  btn.style("color", "#5CD1F2");
  btn.style("font-family", "Georgia, serif");
  btn.style("font-style", "italic");
  btn.style("font-size", "16px");
  btn.style("cursor", "pointer");
  btn.style("letter-spacing", "2px");
  btn.style('position', 'static'); 
  btn.style('display', 'block');
  btn.style('margin', '-30px auto 0 auto');
  btn.mousePressed(toggleAudience);

}

function draw() {
  background(10, 10, 50, 40);



  for (let i = 0; i < lines.length; i++) {
    lines[i].display();
  }

  let hovered = false;
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();

    let d = dist(mouseX, mouseY, particles[i].x, particles[i].y);
    if (d < 50) {
      currentStory = particles[i].story;
      hovered = true;
      particles[i].isHighlighted = true;
    } else {
      particles[i].isHighlighted = false;
    }
  }

  if (hovered) {
    //fade in
    storyAlpha = lerp(storyAlpha, 255, 0.1);
  } else {
    //fade out
    storyAlpha = lerp(storyAlpha, 0, 0.05);
  }

  if (storyAlpha > 1) {
    push();
    fill(255, storyAlpha);
    textAlign(CENTER);
    textSize(18);
    textFont("Georgia");
    text(currentStory, width / 2, height - 40);
    pop();
  }
  //console.log("X: " + mouseX + " Y: " + mouseY);
}

class Particle {
  constructor(x, y, char) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.xSpd = random(-0.9, 0.9);
    this.ySpd = random(-0.9, 0.9);
    this.baseSize = 24;
    this.isHighlighted = false;

    //NEW
    // current story assign
    this.story = musicianStories[storyIndex];

    storyIndex = storyIndex + 1;
    if (storyIndex >= musicianStories.length) {
      storyIndex = 0;
    }

    let freq = notes[noteIndex];
    noteIndex = noteIndex + 1;
    if (noteIndex >= notes.length) {
      noteIndex = 0;
    }

    this.osc = new p5.Oscillator(random(["sine"]));
    this.osc.freq(freq);
    this.osc.amp(0.1);
    this.osc.start();
  }

  update() {
    this.x += this.xSpd + sin(frameCount * 0.02 + this.y) * 0.2;
    this.y += this.ySpd + cos(frameCount * 0.02 + this.x) * 0.2;
    let gravity = (height / 2 - this.y) * 0.01;
    this.y += gravity;

    // looping back wrap
    if (this.x > width + 50) {
      this.x = -50;
    }
    if (this.x < -50) {
      this.x = width + 50;
    }
    if (this.y > height + 50) {
      this.y = -50;
    }
    if (this.y < -50) {
      this.y = height + 50;
    }

    let d = dist(this.x, this.y, mouseX, mouseY);
    let vol = map(d, 0, 90, 0.15, 0, true);
    this.osc.amp(vol, 0.2);
  }

  display() {
    let pulse = 1 + sin(frameCount * 0.04 + this.x) * 0.2;
    let fade = map(sin(frameCount * 0.05 + this.y), -1, 1, 150, 255);

    push();
    if (this.isHighlighted) {
      fill(255, 255);
      textSize(this.baseSize * 1.2);
    } else {
      fill(255, fade);
      textSize(this.baseSize * pulse);
    }
    noStroke();
    textAlign(CENTER, CENTER);
    text(this.char, this.x, this.y);
    pop();
  }
}

class MusicLine {
  constructor(startX, startY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = startX + 800;
    this.endY = startY + 400;
  }

  display() {
    noFill();
    //stroke(230, 20, 150, 150);
    strokeWeight(1.5);

    //line template
    beginShape();
    for (let i = 0; i < 150; i++) {
      let x = map(i, 0, 120, this.startX, this.endX);
      let y = map(i, 0, 120, this.startY, this.endY);

      //wave movement
      let taper = sin(map(i, 0, 149, 0, PI));
      //mouse interaction
      let d = dist(x, y, mouseX, mouseY);
      let mouseBoost = map(d, 0, 200, 50, 0);
      let vibrate = sin(i * 0.2 + frameCount * 0.15) * (50 + mouseBoost);
      let finalY = y + vibrate * taper;

      vertex(x, finalY);
    }

    endShape();
    let lineRed = map(storyAlpha, 0, 255, 50, 255);
    let lineAlpha = map(storyAlpha, 0, 25, 50, 200);
    stroke(lineRed, 20, 150, lineAlpha);
  }
}
