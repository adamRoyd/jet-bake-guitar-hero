class explosion {
  constructor(color, particleCount, force, x, y) {
    this.init(color, particleCount, force, x, y);
  }

  init(color, particleCount, force, x, y) {
    this.numAlive = particleCount;
    this.size = 50;
    this.color = color; // array with rgb value
    this.particles = [];
    this.position = createVector(x, y);
    this.isAlive = true;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new particle(this.position.x, this.position.y, force, this.color));
    }
  }

  update() {
    fill(floor(this.size));    
    this.size += 1.8; // Increase the size increment to make the explosion finish faster
    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].isAlive) {
        this.particles[i].update();
      } else {
        this.particles.splice(i, 1);
        this.numAlive-=2;
      }
      if (this.numAlive === 0) {
        this.isAlive = false;
      }
    }
  }

  reset(color, particleCount, force) {
    this.init(color, particleCount, force, this.position.x, this.position.y);
  }
}