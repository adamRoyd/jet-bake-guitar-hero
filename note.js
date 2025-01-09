
//note object
class Note {
    constructor(n) {
        switch (n) {
            case 1:
                this.x = 100;
                break;
            case 2:
                this.x = 200;
                break;
            case 3:
                this.x = 300;
                break;
            case 4:
                this.x = 400;
                break;
            case 5:
              this.x = 500;
              break;
            case 6:
              this.x = 600;
              break;
        }
        this.y = 0;
        this.n = n;
    }
  
    display() {
        switch (this.n) {
            case 1:
                fill(255, 0, 0);
                break;
            case 2:
                fill(255, 255, 0);
                break;
            case 3:
                fill(0, 255, 0);
                break;
            case 4:
                fill(51, 153, 255);
                break;
            case 5:
              fill(51, 153, 255);
              break;
            case 6:
              fill(51, 153, 255);
              break;
        }
  
        rect(this.x, this.y, 80, 100, 20);
    }
  
    move() {
        this.y += 7;
    }
  }
  