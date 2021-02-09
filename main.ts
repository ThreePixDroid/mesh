import { Triangles } from './lib/triangles'
import { Layer } from './lib/layer'
import { Loop } from './lib/loop'
import { bind } from './lib/bind'

class Main {
  layer = new Layer(this.container)
  loop = new Loop(this.update, this.display)

  triangles?: Triangles

  constructor(private container) {
    addEventListener(`resize`, this.createTriangles)
    this.createTriangles();
  }

  @bind
  createTriangles() {
    this.triangles = new Triangles(this.layer);
  }

  @bind
  update(correction = 0) {
    this.triangles.updateParticles(correction);
  }

  @bind
  display() {
    const { layer, triangles } = this
    layer.context.clearRect(0, 0, layer.w, layer.h);
    triangles.renderTriangles(layer.context);
  }
}

onload = () => {
  new Main(document.body);
}