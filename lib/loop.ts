import { bind } from "./bind"

type Update = (ct: number) => void

// game / animation loop
export class Loop {
  private deltaTime = 0
  private lastUpdate = 0
  private maxInterval = 40

  private update?: Update
  private display?: Function

  constructor(update: Update, display: Function) {
    this.update = update;
    this.display = display;
    requestAnimationFrame(this.animate)
  }

  @bind
  animate(currentTime) {
    requestAnimationFrame(this.animate)
    this.deltaTime = currentTime - this.lastUpdate
    
    if (this.deltaTime < this.maxInterval) {
      this.update(this.deltaTime / 1000)
      this.display()
    }
    
    this.lastUpdate = currentTime
  }
}