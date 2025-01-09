
//menu screen
function menu() {
    //title
    for (i = 20; i > 0; i--) {
        fill(255 - i * 10, 10, 255 - i * 2);
        textSize(80);
        text("ADAM ROYD", 40 + i, 120 + i);
        text("JET BAKE", 40 + i, 210 + i);
    }
  
    fill(0, 255, 0);
    strokeWeight(10);
    rect(360, 350, 400, 100, 20);
    fill(255, 255, 0);
    fill(255, 153, 0);
    fill(255, 0, 0);
    noStroke();
    fill(0);
    textSize(70);
    text("PLAY", 270, 375);
  
    //buttons
    //easy
    if (mouseX > 300 && mouseX < 700) {
        if (mouseY > 300 && mouseY < 400) {
            if (mouseIsPressed) {
                scr = "game";
                level = "easy";
                mouseX = 2000;
            }
        }
    }
  
    //medium
    if (mouseX > 300 && mouseX < 700) {
        if (mouseY > 450 && mouseY < 550) {
            if (mouseIsPressed) {
                scr = "game";
                level = "medium";
                speed = 40;
                mouseX = 2000;
            }
        }
    }
  
    //hard
    if (mouseX > 300 && mouseX < 700) {
        if (mouseY > 600 && mouseY < 700) {
            if (mouseIsPressed) {
                scr = "game";
                level = "hard";
                mouseX = 2000;
            }
        }
    }
  
    //expert
    if (mouseX > 300 && mouseX < 700) {
        if (mouseY > 750 && mouseY < 850) {
            if (mouseIsPressed) {
                scr = "game";
                level = "expert";
                speed = 40;
                mouseX = 2000;
            }
        }
    }
  }
  

//draws sidebar
function sideBar() {
    stroke(0);
    fill(255, 0, 255, 200);
    rect(1100, 500, 300, 1200, 20);
    fill(255, 100);
    rect(1075, 800, 200, 80, 20);
    rect(1075, 900, 200, 80, 20);
    noStroke();
    fill(0);
    textSize(45);
    text("SCORE", 980, 50);
    text(score, 1010, 100);
    text("STREAK", 980, 200);
    text(streak, 1010, 250);
    text("LONGEST", 970, 350);
    text("STREAK", 970, 400);
    text(long, 1010, 450);
  
    text("NOTES", 980, 550);
    text("HIT", 980, 600);
    var per = round((notes / tot) * 100);
    if (tot === 0) {
        per = "-";
    }
  
    text(per + "%", 1010, 650);
  
    text("RETRY", 990, 820);
    text("QUIT", 1020, 920);
  
    //retry
    if (mouseX > 975 && mouseX < 1175) {
        if (mouseY > 760 && mouseY < 840) {
            if (mouseIsPressed) {
                mouseX = 2000;
  
                score = 1000;
                streak = 0;
                hit = false;
                ht = 0;
                inc = 0;
                notes = 0;
                long = 0;
                tot = 0;
                h.splice(0, h.length);
                n.splice(0, n.length);
                scr = "game";
                if (level == "easy" || level == "hard") {
                    speed = 50;
                } else {
                    speed = 40;
                }
            }
        }
    }
  
    //quit
    if (mouseX > 975 && mouseX < 1175) {
        if (mouseY > 860 && mouseY < 940) {
            if (mouseIsPressed) {
                mouseX = 2000;
  
                score = 1000;
                streak = 0;
                hit = false;
                ht = 0;
                inc = 0;
                notes = 0;
                long = 0;
                tot = 0;
                h.splice(0, h.length);
                n.splice(0, n.length);
                scr = "menu";
                if (level == "easy" || level == "hard") {
                    speed = 50;
                } else {
                    speed = 40;
                }
            }
        }
    }
  }
  