export class Arm {
  x = 0;
  y = 0;
  length = 100;
  angle = 0;
  centreAngle = 0;
  rotationRange = Math.PI / 4;
  parent = null;
  phaseOffset = 0;

  constructor(length, centreAngle, rotationRange, phaseOffset) {
    this.length = length;
    this.centreAngle = centreAngle;
    this.rotationRange = rotationRange;
    this.phaseOffset = phaseOffset;
  };

  get endX() {
    let angle = this.makeAngle();
    return this.x + Math.cos(angle) * this.length;
  };
  get endY() {
    let angle = this.makeAngle();
    return this.y + Math.sin(angle) * this.length;
  };

  set phase(value) {
    this.angle = this.centreAngle
                + Math.sin(value + this.phaseOffset)
                * this.rotationRange;
  }

  makeAngle() {
    let angle = this.angle;
    let parent = this.parent;
    while(parent) {
      angle += parent.angle;
      parent = parent.parent; 
    }
    return angle;
  }
  render(context) {
    context.strokeStyle = "#000000";
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.endX, this.endY);
    context.stroke();
  }
}