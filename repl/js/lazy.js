class Matrix3 {
  constructor(
    a00 = 1,
    a01 = 0,
    a02 = 0,
    a10 = 0,
    a11 = 1,
    a12 = 0,
    a20 = 0,
    a21 = 0,
    a22 = 1
  ) {
    this.array = [
      [a00, a01, a02],
      [a10, a11, a12],
      [a20, a21, a22],
    ];
  }

  multiply(matrix) {
    let output = new Matrix3();
    let arr = output.array;
    for (let row = 0; row < this.array.length; row++) {
      for (let col = 0; col < this.array[0].length; col++) {
        arr[row][col] =
          this.array[row][0] * matrix.array[0][col] +
          this.array[row][1] * matrix.array[1][col] +
          this.array[row][2] * matrix.array[2][col];
      }
    }
    return output;
  }

  toArray() {
    return Array(
      this.array[0][0],
      this.array[1][0],
      this.array[2][0],
      this.array[0][1],
      this.array[1][1],
      this.array[2][1],
      this.array[0][2],
      this.array[1][2],
      this.array[2][2]
    );
  }
}

class FromArrayMatrix3 extends Matrix3 {
  constructor(arr) {
    super(
      arr[0],
      arr[3],
      arr[6],
      arr[1],
      arr[4],
      arr[7],
      arr[2],
      arr[5],
      arr[8]
    );
  }
}

class RotateMatrix3 extends Matrix3 {
  constructor(degree) {
    const theta = toRad(degree);
    super(cos(theta), -sin(theta), 0, sin(theta), cos(theta), 0, 0, 0, 1);
  }
}

class ScaleMatrix3 extends Matrix3 {
  constructor(scale) {
    super(scale, 0, 0, 0, scale, 0, 0, 0, 1);
  }
}

class TranslateMatrix3 extends Matrix3 {
  constructor(x, y) {
    super(1, 0, x, 0, 1, y, 0, 0, 1);
  }
}

function GetTransform(positionX, positionY, rotation, scale) {
  const scaleM = new ScaleMatrix3(scale);
  const rotateM = new RotateMatrix3(rotation);
  const translateM = new TranslateMatrix3(positionX, positionY);

  return translateM.multiply(rotateM.multiply(scaleM)).toArray();
}

function ApplyTransform(trans1, trans2) {
  const trans1M = new FromArrayMatrix3(trans1);
  const trans2M = new FromArrayMatrix3(trans2);

  return trans2M.multiply(trans1M).toArray();
}

// utils
function toRad(degree) {
  return degree * (Math.PI / 180);
}

function cos(d) {
  return Math.cos(d);
}

function sin(d) {
  return Math.sin(d);
}

GetTransform(100, 200, 0, 1) //=