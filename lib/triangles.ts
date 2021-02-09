interface Particle {
  x: number
  y: number
  homeX: number
  homeY: number
  angle: number
  radius: number
  velocity: number
}

interface Triangle {
  a: Particle
  b: Particle
  c: Particle
}

export class Triangles {
  colorTimer = 0
  colorSpeed = 30
  colorPlate = 160 // from 0 to 360

  w = 0
  h = 0
  d = 0

  rows = 0
  cols = 0

  stepX = 0
  stepY = 0

  offsetX = 0
  offsetY = 0
  extraOffsetX = 0

  extraPoints = 4
  particles: Particle[] = []
  triangles: Triangle[] = []

  constructor({ w, h }, size = 150) {
    this.w = w
    this.h = h
    this.d = Math.hypot(w, h)

    this.stepX = size
    this.stepY = size * Math.sqrt(3) / 2  // calculate height of triangle

    this.rows = ((h / this.stepY) | 0) + this.extraPoints
    this.cols = ((w / this.stepX) | 0) + this.extraPoints

    this.offsetX = (w - (this.cols - 1) * this.stepX) / 2
    this.offsetY = (h - (this.rows - 1) * this.stepY) / 2
    this.extraOffsetX = this.stepX / 4

    this.createParticles()
    this.createTriangles()
  }

  createParticles() {
    this.particles = [];

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const shiftX = i % 2 == 0 ? this.extraOffsetX : -this.extraOffsetX

        const x = j * this.stepX + shiftX + this.offsetX;
        const y = i * this.stepY + this.offsetY;

        const homeX = x;
        const homeY = y;

        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * this.extraOffsetX + this.extraOffsetX;
        const velocity = Math.random() * 2 - 1;

        this.particles.push({
          x, y, homeX, homeY,
          angle, radius, velocity,
        })
      }
    }
  }
  createTriangles() {
    const { triangles, particles, rows, cols } = this

    triangles.splice(0, triangles.length)

    for (let y = 0; y < rows - 1; y++) {
      const vertices: Particle[] = []

      for (let x = 0; x < cols; x++) {
        const one = y % 2 == 0 ? x + (y + 1) * cols : x + y * cols
        const two = y % 2 == 0 ? x + y * cols : x + (y + 1) * cols

        vertices.push(particles[one])
        vertices.push(particles[two])
      }
      for (let i = 0; i < vertices.length - 2; i++) {

        const a = vertices[i]
        const b = vertices[i + 1]
        const c = vertices[i + 2]

        triangles.push({ a, b, c })
      }
    }
  }

  updateParticles(correction = 0) {
    const { particles, colorTimer, colorSpeed } = this

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]

      p.angle += p.velocity * correction

      p.x = Math.cos(p.angle) * p.radius + p.homeX
      p.y = Math.sin(p.angle) * p.radius + p.homeY
    }

    this.colorTimer = colorTimer >= 360 ? 0 : colorTimer + colorSpeed * correction
  }

  renderTriangles(ctx: CanvasRenderingContext2D) {
    const { triangles, d, colorPlate, colorTimer } = this

    for (let i = 0; i < triangles.length; i++) {
      const { a, b, c } = triangles[i]

      const posX = (a.x + b.x + c.x) / 3
      const posY = (a.y + b.y + c.y) / 3
      const dist = Math.hypot(posX, posY)

      const hue = dist / d * colorPlate + colorTimer

      ctx.strokeStyle = `hsl(${hue}, 70%, 70%)`
      ctx.fillStyle = `hsl(${hue}, 70%, 50%)`
      ctx.lineJoin = "bevel"

      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.lineTo(c.x, c.y)
      ctx.closePath()

      ctx.stroke()
      ctx.fill()
    }
  }
}