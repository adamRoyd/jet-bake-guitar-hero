var song;
let letters = [];

function preload() {
  song = loadSound('assets/jetbake2.mp3');
}

let color1 = [255, 0, 0];    // Bold Red
let color2 = [255, 127, 0];  // Bold Orange
let color3 = [255, 255, 0];  // Bold Yellow
let color4 = [127, 0, 255];  // Bold Purple
let color5 = [0, 0, 255];    // Bold Blue
let color6 = [255, 0, 255];  // Bold Pink

let colors = [color1, color2, color3, color4, color5, color6];

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

let Kaboom1;
let Kaboom2;
let Kaboom3;
let Kaboom4;
let Kaboom5;
let Kaboom6;

function setup() {
  Kaboom1 = new explosion(randomColor(), 20, random(1,5), 100, 850);
  Kaboom2 = new explosion(randomColor(), 20, random(1,5), 200, 850);
  Kaboom3 = new explosion(randomColor(), 20, random(1,5), 300, 850);
  Kaboom4 = new explosion(randomColor(), 20, random(1,5), 400, 850);
  Kaboom5 = new explosion(randomColor(), 20, random(1,5), 500, 850);
  Kaboom6 = new explosion(randomColor(), 20, random(1,5), 600, 850);
  frameRate(60)
  createCanvas(720,900);
  rectMode(CENTER);

}


function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}

function handleKaboom(hit, kaboom, x, y) {
  if (hit) {
    if (kaboom.isAlive) {
      kaboom.update();
    }
  }

  if (!kaboom.isAlive) {
    hit = false;
    kaboom.reset(randomColor(), 20, random(1,5));
  }

  return { hit, kaboom };
}

//note array
var n = [];
//hitbox array
var h = [];

var score = 0;
var streak = 0;
var hit = false;
var hit1 = false;
var hit2 = false;
var hit3 = false;
var hit4 = false;
var hit5 = false;
var hit6 = false;
var ht = 0;
var inc = 0;
var level = "easy";
var size2 = 1000;
var long = 0;
var tot = 0;
var notes = 0;
var scr = "game";

function draw() {
  translate(0, -80);
  //menu screen
  if (scr == "menu") {
      background(255);
      drawBack();
      menu();
  }

  //game screen
  if (scr == "game") {
      background(0,255,0);
      //drawBack();

      //sets longest streak
      if (long < streak) {
          long = streak;
      }

      drawLines();
      
      let result1 = handleKaboom(hit1, Kaboom1, 100, 850);
      hit1 = result1.hit;
      Kaboom1 = result1.kaboom;
      
      let result2 = handleKaboom(hit2, Kaboom2, 200, 850);
      hit2 = result2.hit;
      Kaboom2 = result2.kaboom;
      
      let result3 = handleKaboom(hit3, Kaboom3, 300, 850);
      hit3 = result3.hit;
      Kaboom3 = result3.kaboom;
      
      let result4 = handleKaboom(hit4, Kaboom4, 400, 850);
      hit4 = result4.hit;
      Kaboom4 = result4.kaboom;
      
      let result5 = handleKaboom(hit5, Kaboom5, 500, 850);
      hit5 = result5.hit;
      Kaboom5 = result5.kaboom;
      
      let result6 = handleKaboom(hit6, Kaboom6, 600, 850);
      hit6 = result6.hit;
      Kaboom6 = result6.kaboom;

      stroke(0);

      pushNotes();

      //displays and moves notes
      for (let i = 0; i < n.length; i++) {
          n[i].display();
          n[i].move();
      }

      //removes notes from array when off screen
      for (let i = 0; i < n.length; i++) {
          if (n[i].y >= 850) {
              score -= 200;
              streak = 0;
              hit = true;
              ht = 0;
              if(n[i].x === 100){
                hit1 = true;
              }  
              if(n[i].x === 200){
                hit2 = true; 
                if(frameCount < 600 && frameCount > 500){
                  explodeText("PERFECT");
                }            
              }
              if(n[i].x === 300){
                hit3 = true;
              }              
              if(n[i].x === 400){
                hit4 = true;
              }              
              if(n[i].x === 500){
                hit5 = true;
              }
              if(n[i].x === 600){
                hit6 = true;
              }
              n.splice(i, 1);
              tot++;            
          }
      }

      //displays and fades hitboxes
      for (let i = 0; i < h.length; i++) {
          h[i].display();
          h[i].fade();
      }

      //removes hitboxes from array after faded
      for (let i = 0; i < h.length; i++) {
          if (h[i].f < 0) {
              h.splice(i, 1);
          }
      }

      drawLetters();
  }

  //gameover screen
  if (scr == "gameover") {
      sideBar();
      for (i = 20; i > 0; i--) {
          fill(255 - i * 10, 10, 255 - i * 2);
          textSize(120);
          text("GAME OVER", 100 + i, 320 + i);
      }
  }
}

//draws background
function drawBack() {
  circ(500, 500, size2);
  size2 += 50;
  if (size2 > 3000) {
      size2 = 2000;
  }
}

//more background
function circ(x, y, s) {
  stroke(0);
  noFill();
  strokeWeight(s / 10);
  ellipse(x, y, s, s);
  if (s > 10) {
      circ(x, y, s / 1.5);
  }
}

function drawLines() {
  stroke(0);
  strokeWeight(10);
  fill(255, 255, 255, 0);

  // Define the top and bottom widths of the trapezium
  let topWidth = 400;
  let bottomWidth = 600;
  let topY = 100;
  let bottomY = 850; // Adjusted to match the y position of the note buttons

  // Calculate the horizontal offset for centering the trapezium
  let offsetX = (bottomWidth - topWidth) / 2;

  // Draw the trapezium
  beginShape();
  vertex(100 + offsetX, topY);
  vertex(100 + 334 + offsetX, topY);
  vertex(100 + 500, bottomY);
  vertex(100, bottomY);
  endShape(CLOSE);

  // Draw the lines inside the trapezium
  for (let i = 0; i <= 6; i++) {
    let topX = 100 + offsetX + (topWidth / 6) * i;
    let bottomX = 100 + (bottomWidth / 6) * i;

    if(i<6){
      line(topX, topY, bottomX, bottomY);
    }    
  }

  // Draw the note buttons
  fill(color1, 200);
  rect(100, 850, 80, 100, 20);
  fill(color2, 200);
  rect(200, 850, 80, 100, 20);
  fill(color3, 200);
  rect(300, 850, 80, 100, 20);
  fill(color4, 200);
  rect(400, 850, 80, 100, 20);
  fill(color5, 200);
  rect(500, 850, 80, 100, 20);
  fill(color6, 200);
  rect(600, 850, 80, 100, 20);

  fill(0);
  noStroke();
  stroke(0);
}

function explodeText(text) {
  textSize(50);
  textStyle(BOLD); // Make the text bold
  noStroke();
  let currentPos = random(width / 2);
  
  for (let i = 0; i < text.length; i++) {
    let letterObj = {
      letter: text.charAt(i),
      yPos: 800,
      xPos: currentPos,
      xDir: random(-0.3, 0.3),
      yDir: random(-0.5, 0.5),
      alpha: 255 // Initial alpha value for fading
    };
    letters.push(letterObj);
    currentPos += textWidth(text.charAt(i));
  }
}

function drawLetters() {
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    fill(0, 255,255, letter.alpha);
    text(letter.letter, letter.xPos, letter.yPos);
    letter.xPos += letter.xDir;
    letter.yPos += letter.yDir;
    letter.alpha -= 2; // Decrease alpha for fading effect

    // Remove the letter if it is fully faded
    if (letter.alpha <= 0) {
      letters.splice(i, 1);
      i--; // Adjust index after removal
    }
  }
}

function pushNotes(){
  if (frameCount == 100){
    song.play();
  }
  if (frameCount == 15) {
    n.push(new Note(1));
  }
  if (frameCount == 30) {
    n.push(new Note(2));
  }
  if (frameCount == 45) {
    //crotchet
    n.push(new Note(3));
  }
  if (frameCount == 75) {
    n.push(new Note(4));
  }
  if (frameCount == 90) {
    n.push(new Note(3));
  }
  if (frameCount == 105) {
    // triplet
    n.push(new Note(5));
  }
  if (frameCount == 127) {
    // triplet
    n.push(new Note(6));
  }
  if (frameCount == 150) {
    // triplet
    explodeText("AMAZING");
    n.push(new Note(5));
  }
  if (frameCount == 178) {
    // triplet LONG
    n.push(new Note(4));
  }
if (frameCount == 240) {
  n.push(new Note(5));
}
if (frameCount == 255) {
  n.push(new Note(4));
}
if (frameCount == 270) {
  // crotchet
  n.push(new Note(3));
}
if (frameCount == 310) {
  n.push(new Note(4));
}
if (frameCount == 345) {
  n.push(new Note(3));
}
if (frameCount == 360) {
  n.push(new Note(2));
}
if (frameCount == 382) {
  n.push(new Note(1));
}
if (frameCount == 405) {
  n.push(new Note(3));
}
if (frameCount == 420) {
  n.push(new Note(2));
}
if (frameCount == 495) {
  n.push(new Note(4));
}
if (frameCount == 502) {
  n.push(new Note(5));
}
if (frameCount == 517) {
  n.push(new Note(4));
}
if (frameCount == 525) {
  n.push(new Note(5));
}
if (frameCount == 570) {
  n.push(new Note(4));
}
if (frameCount == 585) {
  n.push(new Note(5));
}
if (frameCount == 600) {
  n.push(new Note(6));
}
if (frameCount == 622) {
  n.push(new Note(5));
}
if (frameCount == 645) {
  n.push(new Note(4));
}
if (frameCount == 705) {
  n.push(new Note(6));
}
if (frameCount == 728) {
  n.push(new Note(5));
}
if (frameCount == 750) {
  n.push(new Note(4));
}
if (frameCount == 768) {
  n.push(new Note(5));
}
if (frameCount == 795) {
  n.push(new Note(4));
}
if (frameCount == 818) {
  n.push(new Note(3));
}
if (frameCount == 840) {
  n.push(new Note(2));
}
if (frameCount == 863) {
  n.push(new Note(1));
}
if (frameCount == 885) {
  n.push(new Note(3));
}
if (frameCount == 902) {
  n.push(new Note(2));
}
}