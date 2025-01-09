var song;


function preload() {
  song = loadSound('assets/jetbake.mp3');
}

function setup() {
  frameRate(60)
  createCanvas(720,900);
  rectMode(CENTER);
}


function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
  } else {
    song.play();
  }
}


//note array
var n = [];
//hitbox array
var h = [];

var score = 1000;
var streak = 0;
var hit = false;
var ht = 0;
var speed = 15;
var inc = 0;
var level = "easy";
var size2 = 1000;
var long = 0;
var tot = 0;
var notes = 0;
var scr = "game";

function draw() {
  //menu screen
  if (scr == "menu") {
      background(255);
      drawBack();
      menu();
  }

  //game screen
  if (scr == "game") {
      background(255);
      drawBack();

      //sets longest streak
      if (long < streak) {
          long = streak;
      }

      //red background when miss
      if (hit && ht < 5) {
          background(255, 0, 0, 100);
          ht++;
      }

      if (ht > 5) {
          hit = false;
      }

      drawLines();

      stroke(0);

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
        n.push(new Note(5));
      }
      if (frameCount == 172) {
        // triplet LONG
        n.push(new Note(4));
      }
      if (frameCount == 225) {
        n.push(new Note(5));
      }
      if (frameCount == 240) {
        n.push(new Note(4));
      }
      if (frameCount == 255) {
        // crotchet
        n.push(new Note(3));
      }
      if (frameCount == 285) {
        n.push(new Note(4));
      }
      if (frameCount == 300) {
        n.push(new Note(3));
      }
      if (frameCount == 315) {
        n.push(new Note(2));
      }
      if (frameCount == 337) {
        n.push(new Note(1));
      }
      if (frameCount == 360) {
        n.push(new Note(3));
      }
      if (frameCount == 375) {
        n.push(new Note(2));
      }

      //displays and moves notes
      for (let i = 0; i < n.length; i++) {
          n[i].display();
          n[i].move();
      }

      //removes notes from array when off screen
      for (let i = 0; i < n.length; i++) {
          if (n[i].y > 900) {
              score -= 200;
              streak = 0;
              hit = true;
              ht = 0;
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

      //increases speed
      if (inc % 20 === 0) {
          speed--;
          inc++;
      }

      sideBar();

      //gameover if negative score
      // if (score < 0) {
      //     scr = "gameover";
      // }
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
  size2 += 8;
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

//draws rows and note buttons
function drawLines() {
  stroke(0);
  strokeWeight(10);
  fill(255, 200);
  rect(100, 500, 80, 1200, 20);
  rect(200, 500, 80, 1200, 20);
  rect(300, 500, 80, 1200, 20);
  rect(400, 500, 80, 1200, 20);
  rect(500, 500, 80, 1200, 20);
  rect(600, 500, 80, 1200, 20);

  fill(255, 0, 0, 200);
  rect(100, 850, 80, 100, 20);
  fill(255, 255, 0, 200);
  rect(200, 850, 80, 100, 20);
  fill(0, 255, 0, 200);
  rect(300, 850, 80, 100, 20);
  fill(51, 153, 255);
  rect(400, 850, 80, 100, 20);
  fill(51, 25, 255);
  rect(500, 850, 80, 100, 20);
  fill(30, 153, 255);
  rect(600, 850, 80, 100, 20);

  fill(0);
  noStroke();
  stroke(0);
}

//checks which key is pressed
function keyTyped() {
  if (key === "z") {
      checkDist(1);
  }
  if (key == "x") {
      checkDist(2);
  }
  if (key == "c") {
      checkDist(3);
  }
  if (key == "v") {
      checkDist(4);
  }
}

//hitbox object
class Hit {
  constructor(n, y, c) {
      switch (n) {
          case 1:
              this.x = 200;
              break;
          case 2:
              this.x = 400;
              break;
          case 3:
              this.x = 600;
              break;
          case 4:
              this.x = 800;
              break;
      }

      this, (y = y);
      this.c = c;
      this.f = 255;
      this.w = 150;
      this.h = 100;
  }

  display() {
      switch (this.c) {
          case "e":
              stroke(102, 255, 255, this.f);
              break;
          case "g":
              stroke(102, 255, 153, this.f);
              break;
          case "m":
              stroke(255, 255, 102, this.f);
              break;
          case "b":
              stroke(204, 0, 0, this.f);
              break;
      }
      noFill();
      strokeWeight(12);
      rect(this.x, 850, this.w, this.h, 20);
  }

  fade() {
      this.f -= 10;
      this.w += 0.5;
      this.h += 0.5;
  }
}

//checks how close each note is to the hitbox
function checkDist(num) {
  for (let i = 0; i < n.length; i++) {
      if (n[i].n == num) {
          //excellent
          if (abs(n[i].y - 850) < 10) {
              h.push(new Hit(num, n[i].y, "e"));
              score += 300;
              streak++;
              inc++;
              notes++;
              n.splice(i, 1);
              tot++;
              break;
          }
          //good
          else if (abs(n[i].y - 850) < 30) {
              h.push(new Hit(num, n[i].y, "g"));
              score += 150;
              streak++;
              inc++;
              notes++;
              n.splice(i, 1);
              tot++;
              break;
          }
          //medium
          else if (abs(n[i].y - 850) < 40) {
              h.push(new Hit(num, n[i].y, "m"));
              score += 100;
              inc++;
              streak++;
              notes++;
              n.splice(i, 1);
              tot++;
              break;
          }
          //bad
          else if (abs(n[i].y - 850) < 50) {
              h.push(new Hit(num, n[i].y, "b"));
              score += 50;
              streak++;
              inc++;
              notes++;
              n.splice(i, 1);
              tot++;
              break;
          }
          //miss
          else {
              if (scr != "gameover") {
                  score -= 100;
              }
              streak = 0;
              hit = true;
              ht = 0;
          }
      }
  }
  stroke(0);
}
