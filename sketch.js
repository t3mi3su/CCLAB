let scanned = [];
let mydoodle1;
let mydoodle2;
let cloudXs = [];
let cloudYs = [];
let cloudSpeed = [];
let curdoodle1 = 0;
let curdoodle2 = 0;
let mySound;


function preload() {
  for (let i = 1; i <= 3; i++) {
    scanned.push(loadImage("img_" + i + ".jpg"));
  }
  mySound = loadSound("space_journey.mp3");
}

function setup() {
  createCanvas(800, 500);
  //mySound.play();
  eraseBg(scanned, 150);
  mydoodle1 = crop(scanned, 0, 0, 650, 420);
  mydoodle2 = crop(scanned, 1200, 0, 700, 420);

  // multiple instances of same blob
  for (let i = 0; i < 5; i++) {
    cloudXs.push(random(0, width)); // random x,y to list 
    cloudYs.push(random(50, 200));
    cloudSpeed.push(random(1, 2));

  }
}

function draw() {
  background(255);
  //let f = map(mouseX, 0, width/2.5, 0, 255);
  //tint(f, 100, 200);
  
 
  //smaller bobs of doodle2
  for (let i = 0; i < 5; i++) {

    cloudXs[i] = cloudXs[i] - cloudSpeed[i]; //update
    //using sin() to make it bob up and dowm, offset
    let bob = sin((frameCount + i * 20) * 0.05) * 20;
    let index = floor((frameCount * 0.3) % mydoodle2.length);

    //not to move outside canvas
    if (cloudXs[i] < -200) {
      cloudXs[i] = width + 200;
    }
    image(mydoodle2[index], cloudXs[i], cloudYs[i] + bob, 150, 100);

  }

  //doodle 1

  image(
    mydoodle1[curdoodle1],
    100,
    100,
    mydoodle1[0].width * 0.5,
    mydoodle1[0].height * 0.5
  );
  //doodle 2

  image(
    mydoodle2[curdoodle2],
    300,
    100,
    mydoodle2[0].width * 0.5,
    mydoodle2[0].height * 0.5
  );


  curdoodle1 = floor((frameCount / 10) % mydoodle1.length);
  let d = dist(mouseX, mouseY, 400, 100);
  //text("hold me!", 400, 80);
  if (d < 100) {
    if (!mySound.isPlaying()){
      mySound.loop();
    }
    let volValue = map(mouseY, 0, height, 1.0, 0.0);
    mySound.setVolume(volValue);
    let panValue = map(mouseX, 0, width, -1.0, 0.0);
    mySound.pan(panValue);

    curdoodle2 = floor(map(sin(frameCount), -1, 1, 0, mydoodle2.length));
    textFont('Verdana');
    textStyle(BOLD);
    textStyle(ITALIC);
    textSize(30);
    textAlign(CENTER, CENTER);
    stroke(0);
    strokeWeight(1);
    text(" ‧₊˚♪ 𝄞₊˚⊹ hmph! ( ｡ •̀ ᴖ •́ ｡)", 400, 80);

  } else{
    //text("go away!", 400, 80);
    mySound.pause();
  }
  

}

//function mouseDragged(){
  //if (mySound.isPlaying() == false) {
   //mySound.loop();
  //}
//}

//function mouseReleased(){
  //mySound.stop()
//}

//function mousePressed(){
  //mySound.play();
//}
// You shouldn't need to modify these helper functions:

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned
}
