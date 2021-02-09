import { Triangles } from './triangles.js'
import { Layer } from './layer.js'
import { Loop } from './loop.js'

class App {
  constructor(container) {
    this.layer = new Layer(container);

    addEventListener(`resize`, () => this.createTriangles() );
    this.createTriangles();

    this.loop = new Loop(ct => this.update(ct), () => this.display());
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