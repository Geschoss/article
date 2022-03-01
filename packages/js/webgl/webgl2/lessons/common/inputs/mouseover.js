
export const mouseover = (config, canvas, test) => {
  // TODO lazy
  canvas.onmousemove = (e) => {
    if (test) {
      console.log(e);
    }
    const { movementX, movementY } = e;
    if (movementX !== 0) {
      const h = config['h'];
      if (h) {
        h(movementX);
      }
    }
    if (movementY !== 0) {
      const h = config['v'];
      if (h) {
        h(movementY);
      }
    };
    let afterAll = config.afterAll;
    if (config.afterAll) {
      afterAll(e);
    }
  }
};
