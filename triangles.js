export class Triangles {
  constructor({w, h}, size = 150) {

    this.w = w;
    this.h = h;
    this.d = Math.hypot(w, h);

    this.colorTimer = 0;
    this.colorSpeed = 30;
    this.colorPlate = 160; // from 0 to 360

    this.stepX = size;
    this.stepY = size * Math.sqrt(3) / 2; // calculate height of triangle
    
    this.extraPoints = 4;
    this.rows = ( (h / this.stepY) | 0) + this.extraPoints;
    this.cols = ( (w / this.stepX) | 0) + this.extraPoints;
    
    this.offsetX = (w - (this.cols - 1) * this.stepX) / 2;
    this.offsetY = (h - (this.rows - 1) * this.stepY) / 2;
    this.extraOffsetX = this.stepX / 4;
    
    this.createParticles();
    this.createTriangles();
  }
  createParticles() {
    this.particles = [];

    for (let i = 0 ; i < this.rows ; i++) {
      for (let j = 0 ; j < this.cols ; j++) {

        const shiftX = i % 2 == 0 ? this.extraOffsetX : -this.extraOffsetX
        
        const x = j * this.stepX + shiftX + this.offsetX;
        const y = i * this.stepY + this.offsetY;

        const homeX = x;
        const homeY = y;

        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * this.extraOffsetX + this.extraOffsetX;
        const velocity = Math.random() * 2 - 1;

        this.particles.push({
          x, 
          y, 
          homeX, 
          homeY, 
          angle, 
          radius,
          velocity,
        });
      }
    }
  }
  createTriangles() {
    this.triangles = [];
    for (let y = 0 ; y < this.rows - 1 ; y++) {

      const vertices = [];
      for (let x = 0 ; x < this.cols ; x++) {

        const one = y % 2 == 0 ? x + (y + 1) * this.cols : x +  y      * this.cols;
        const two = y % 2 == 0 ? x +  y      * this.cols : x + (y + 1) * this.cols;
    
        vertices.push(this.particles[one]);
        vertices.push(this.particles[two]);
      }
      for(let i = 0; i < vertices.length - 2; i++) {

        const a = vertices[i];
        const b = vertices[i + 1];
        const c = vertices[i + 2];

        this.triangles.push({a, b, c});
      }
    }
  }
  updateParticles(correction = 0) {
    for (let i = 0 ; i < this.particles.length ; i++) {
      const p = this.particles[i];
      
      p.angle += p.velocity * correction;

      p.x = Math.cos(p.angle) * p.radius + p.homeX;
      p.y = Math.sin(p.angle) * p.radius + p.homeY;
    }

    this.colorTimer = this.colorTimer >= 360 ? 0 : this.colorTimer + this.colorSpeed * correction;
  }
  /** @param {CanvasRenderingContext2D} ctx */
  renderTriangles(ctx) {
    for (let i = 0 ; i < this.triangles.length ; i++) {
      const {a, b, c} = this.triangles[i];

      const posX = (a.x + b.x + c.x) / 3;
      const posY = (a.y + b.y + c.y) / 3;
      const dist = Math.hypot(posX, posY);

      const hue = dist / this.d * this.colorPlate + this.colorTimer;

      ctx.strokeStyle = `hsl(${hue}, 70%, 70%)`;
      ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
      ctx.lineJoin = "bevel"

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineTo(c.x, c.y);
      ctx.closePath();

      ctx.stroke();
      ctx.fill();
    }
  }
}