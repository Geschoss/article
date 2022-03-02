import { Arm } from './arm';

export class FKSystem {
  phase = 0;
  speed = 0.05;
  arms = [];
  lastArm = null;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  addArm(length, centreAngle, rotationRange, phaseOffset) {
    let arm = new Arm(length, centreAngle, rotationRange, phaseOffset);
    this.arms.push(arm);
    if (this.lastArm) {
      arm.parent = this.lastArm;
    }
    this.lastArm = arm;
    this.update();
  }
  update() {
    this.arms.forEach((arm) => {
      arm.phase = this.phase;
      if (arm.parent) {
        arm.x = arm.parent.endX;
        arm.y = arm.parent.endY;
      } else {
        arm.x = this.x;
        arm.y = this.y;
      }
    })
    this.phase += this.speed;
  }
  render(context) {
    this.arms.forEach((arm) => {
      arm.render(context);
    })
  }

  rotateArm(index, angle) {
    this.arms[index].angle = angle;
  }
}