//note object

class Note {
    constructor(n) {
      this.n = n;
      this.y = 0;
      this.z = 1000; // Start far away
      this.updateX();
    }
  
    updateX() {
      let topWidth = 400;
      let bottomWidth = 600;
      let topY = 100;
      let bottomY = 850;
      let offsetX = (bottomWidth - topWidth) / 2;
      let t = (this.y - topY) / (bottomY - topY);
      let topX = 100 + offsetX + (topWidth / 6) * (this.n - 1);
      let bottomX = 100 + (bottomWidth / 6) * (this.n - 1);
      this.x = lerp(topX, bottomX, t);
    }
  
    move() {
      this.z -= 10; // Adjust the speed as needed
      this.y = map(this.z, 0, 1000, 850, 100); // Map z to y position
      this.updateX();
    }
  
    display() {
    noStroke();
      let size = map(this.z, 0, 1000, 50, 10); // Adjust the size based on z
      switch (this.n) {
        case 1:
          fill(color1);
          break;
        case 2:
          fill(color2);
          break;
        case 3:
          fill(color3);
          break;
        case 4:
          fill(color4);
          break;
        case 5:
          fill(color5);
          break;
        case 6:
          fill(color6);
          break;
      }
      ellipse(this.x, this.y, size, size); // Adjust the size as needed
    }
  
    explode() {
      let Kaboom = new explosion(color, 20, 1.6, this.x, this.y);
      if (Kaboom.isAlive) {
        Kaboom.update();
      }
    }
  }