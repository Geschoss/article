import { Arm } from './arm';
import { FKSystem } from './fksystem';

export const kinematics = (context) => {
  const width = context.canvas.width;
  const height = context.canvas.height;

  let fks_1 = new FKSystem(width / 3, height / 8);
  let fks_2 = new FKSystem(width / 3, height / 8);
  fks_1.addArm(200, Math.PI / 2, Math.PI / 4, 0);
  fks_1.addArm(180, 0.87, 0.87, -1.5);
  
  fks_2.phase = Math.PI;
  fks_2.addArm(200, Math.PI / 2, Math.PI / 4, 0);
  fks_2.addArm(180, 0.87, 0.87, -1.5);
  
  update();

  function update() {
    context.clearRect(0, 0, width, height);
    
    
    fks_1.update();
    fks_1.render(context);
    fks_2.update();
    fks_2.render(context);

    requestAnimationFrame(update);
  }
}