import { bind } from "./bind"

export class Layer {
  canvas = document.createElement('canvas')
  context = this.canvas.getContext('2d')

  get w() { return this.canvas.width }
  get h() { return this.canvas.height }

  constructor(container: HTMLElement) {
    container.appendChild(this.canvas)                   //put Canvas to Container
    addEventListener(`resize`, this.fitToContainer)
    this.fitToContainer()
  }

  @bind
  fitToContainer() {
    const { canvas } = this                             //fit Canvas size to container

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
}