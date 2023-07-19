let px_x = 2 * cos(toRad(90)); //=
let px_y = 2 * sin(toRad(90)); //=

let py_x = 1 * -sin(toRad(90)); //=
let py_y = 1 * cos(toRad(90)); //=

function toRad(degree) {
  return degree * (Math.PI / 180);
}

function cos(d) {
  return Math.cos(d);
}

function sin(d) {
  return Math.sin(d);
}
