// game / animation loop
export class Loop {
  /**@param {Function} sequence  */
  constructor(update, display) {
    this.update = update;
    this.display = display;

    this.deltaTime = 0;
    this.lastUpdate = 0;
    this.maxInterval = 40;

    requestAnimationFrame(st => this.animate(st));
  }
  animate(currentTime) {
    requestAnimationFrame(st => this.animate(st));

    this.deltaTime = currentTime - this.lastUpdate;
    
    if (this.deltaTime < this.maxInterval) {
      this.update(this.deltaTime / 1000);
      this.display();
    }
    
    this.lastUpdate = currentTime;
  }
}