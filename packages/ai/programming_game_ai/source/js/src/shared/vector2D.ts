export class Vector2D {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  normalize() {
    let l = this.length;
    return new Vector2D(this.x / l, this.y / l);
  }

  add(other: Vector2D) {
    return new Vector2D(this.x + other.x, this.y + other.y);
  }
}
