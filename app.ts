import { Triangles } from './triangles'
import { Layer } from './layer'
import { Loop } from './loop'

class App {
  layer = new Layer(this.container)
  loop = new Loop(ct => this.update(ct), () => this.display())

  triangles?: Triangles

  constructor(private container) {
    this.createTriangles = this.createTriangles.bind(this)
    addEventListener(`resize`, this.createTriangles)
    this.createTriangles();
  }

  createTriangles() {
    this.triangles = new Triangles(this.layer);
  }

  update(correction = 0) {
    this.triangles.updateParticles(correction);
  }

  display() {
    this.layer.context.clearRect(0, 0, this.layer.w, this.layer.h);
    this.triangles.renderTriangles(this.layer.context);
  }
}

onload = () => {
  new App(document.querySelector(`body`));
}