type Toggle = 0 | 1;

/**
 * Constructor of Matrix4
 * If opt_src is specified, new matrix is initialized by opt_src.
 * Otherwise, new matrix is initialized by identity matrix.
 * @param opt_src source matrix(option)
 */
export class Matrix4 {
    elements: Float32Array;
    constructor(opt_src?: Matrix4) {
        if (opt_src && typeof opt_src === 'object') {
            const d = new Float32Array(16);
            for (let i = 0; i < 16; ++i) {
                d[i] = opt_src[i];
            }
            this.elements = d;
        } else {
            this.elements = new Float32Array([
                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
            ]);
        }
    }

    set = set;
    scale = scale;
    concat = concat;
    lookAt = lookAt;
    rotate = rotate;
    multiply = concat;
    setScale = setScale;
    setOrtho = setOrtho;
    translate = translate;
    setLookAt = setLookAt;
    setRotate = setRotate;
    setIdentity = setIdentity;
    perspective = perspective;
    setTranslate = setTranslate;
    setPerspective = setPerspective;
}

/**
 * Set the identity matrix.
 * @return this
 */
function setIdentity() {
    var e = this.elements;

    e[0] = 1;
    e[4] = 0;
    e[8] = 0;
    e[12] = 0;
    e[1] = 0;
    e[5] = 1;
    e[9] = 0;
    e[13] = 0;
    e[2] = 0;
    e[6] = 0;
    e[10] = 1;
    e[14] = 0;
    e[3] = 0;
    e[7] = 0;
    e[11] = 0;
    e[15] = 1;

    return this;
}

/**
 * Set the matrix for rotation.
 * The vector of rotation axis may not be normalized.
 * @param angle The angle of rotation (degrees)
 * @param x The X coordinate of vector of rotation axis.
 * @param y The Y coordinate of vector of rotation axis.
 * @param z The Z coordinate of vector of rotation axis.
 */
function setRotate(angle: number, x: Toggle, y: Toggle, z: Toggle) {
    var len, rlen, nc, xy, yz, zx, xs, ys, zs;

    angle = (Math.PI * angle) / 180;
    let elements = this.elements;

    let sin = Math.sin(angle);
    let cos = Math.cos(angle);

    if (0 !== x && 0 === y && 0 === z) {
        // Rotation around X axis
        if (x < 0) {
            sin = -sin;
        }
        elements[0] = 1;
        elements[4] = 0;
        elements[8] = 0;
        elements[12] = 0;

        elements[1] = 0;
        elements[5] = cos;
        elements[9] = -sin;
        elements[13] = 0;

        elements[2] = 0;
        elements[6] = sin;
        elements[10] = cos;
        elements[14] = 0;

        elements[3] = 0;
        elements[7] = 0;
        elements[11] = 0;
        elements[15] = 1;
    } else if (0 === x && 0 !== y && 0 === z) {
        // Rotation around Y axis
        if (y < 0) {
            sin = -sin;
        }
        elements[0] = cos;
        elements[4] = 0;
        elements[8] = sin;
        elements[12] = 0;

        elements[1] = 0;
        elements[5] = 1;
        elements[9] = 0;
        elements[13] = 0;

        elements[2] = -sin;
        elements[6] = 0;
        elements[10] = cos;
        elements[14] = 0;

        elements[3] = 0;
        elements[7] = 0;
        elements[11] = 0;
        elements[15] = 1;
    } else if (0 === x && 0 === y && 0 !== z) {
        // Rotation around Z axis
        if (z < 0) {
            sin = -sin;
        }
        elements[0] = cos;
        elements[4] = -sin;
        elements[8] = 0;
        elements[12] = 0;
        elements[1] = sin;
        elements[5] = cos;
        elements[9] = 0;
        elements[13] = 0;
        elements[2] = 0;
        elements[6] = 0;
        elements[10] = 1;
        elements[14] = 0;
        elements[3] = 0;
        elements[7] = 0;
        elements[11] = 0;
        elements[15] = 1;
    } else {
        // Rotation around another axis
        len = Math.sqrt(x * x + y * y + z * z);
        if (len !== 1) {
            rlen = 1 / len;
            x *= rlen;
            y *= rlen;
            z *= rlen;
        }
        nc = 1 - cos;
        xy = x * y;
        yz = y * z;
        zx = z * x;
        xs = x * sin;
        ys = y * sin;
        zs = z * sin;

        elements[0] = x * x * nc + cos;
        elements[1] = xy * nc + zs;
        elements[2] = zx * nc - ys;
        elements[3] = 0;

        elements[4] = xy * nc - zs;
        elements[5] = y * y * nc + cos;
        elements[6] = yz * nc + xs;
        elements[7] = 0;

        elements[8] = zx * nc + ys;
        elements[9] = yz * nc - xs;
        elements[10] = z * z * nc + cos;
        elements[11] = 0;

        elements[12] = 0;
        elements[13] = 0;
        elements[14] = 0;
        elements[15] = 1;
    }

    return this;
}

/**
 * Multiply the matrix for translation from the right.
 * @param x The X value of a translation.
 * @param y The Y value of a translation.
 * @param z The Z value of a translation.
 * @return this
 */
function translate(x: number, y: number, z: number) {
    var e = this.elements;
    e[12] += e[0] * x + e[4] * y + e[8] * z;
    e[13] += e[1] * x + e[5] * y + e[9] * z;
    e[14] += e[2] * x + e[6] * y + e[10] * z;
    e[15] += e[3] * x + e[7] * y + e[11] * z;
    return this;
}

/**
 * Set the matrix for translation.
 * @param x The X value of a translation.
 * @param y The Y value of a translation.
 * @param z The Z value of a translation.
 * @return this
 */
function setTranslate(x: number, y: number, z: number) {
    var e = this.elements;
    e[0] = 1;
    e[4] = 0;
    e[8] = 0;
    e[12] = x;
    e[1] = 0;
    e[5] = 1;
    e[9] = 0;
    e[13] = y;
    e[2] = 0;
    e[6] = 0;
    e[10] = 1;
    e[14] = z;
    e[3] = 0;
    e[7] = 0;
    e[11] = 0;
    e[15] = 1;
    return this;
}

/**
 * Multiply the matrix for rotation from the right.
 * The vector of rotation axis may not be normalized.
 * @param angle The angle of rotation (degrees)
 * @param x The X coordinate of vector of rotation axis.
 * @param y The Y coordinate of vector of rotation axis.
 * @param z The Z coordinate of vector of rotation axis.
 * @return this
 */
function rotate(angle: number, x: Toggle, y: Toggle, z: Toggle) {
    return this.concat(new Matrix4().setRotate(angle, x, y, z));
}

/**
 * Multiply the matrix from the right.
 * @param other The multiply matrix
 * @return this
 */
function concat(other: Matrix4): Matrix4 {
    var i, e, a, b, ai0, ai1, ai2, ai3;

    // Calculate e = a * b
    e = this.elements;
    a = this.elements;
    b = other.elements;

    // If e equals b, copy b to temporary matrix.
    if (e === b) {
        b = new Float32Array(16);
        for (i = 0; i < 16; ++i) {
            b[i] = e[i];
        }
    }

    for (i = 0; i < 4; i++) {
        ai0 = a[i];
        ai1 = a[i + 4];
        ai2 = a[i + 8];
        ai3 = a[i + 12];
        e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
        e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
        e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
        e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
    }

    return this;
}

/**
 * Set the matrix for scaling.
 * @param x The scale factor along the X axis
 * @param y The scale factor along the Y axis
 * @param z The scale factor along the Z axis
 * @return this
 */
function setScale(x: number, y: number, z: number) {
    var e = this.elements;
    e[0] = x;
    e[4] = 0;
    e[8] = 0;
    e[12] = 0;
    e[1] = 0;
    e[5] = y;
    e[9] = 0;
    e[13] = 0;
    e[2] = 0;
    e[6] = 0;
    e[10] = z;
    e[14] = 0;
    e[3] = 0;
    e[7] = 0;
    e[11] = 0;
    e[15] = 1;
    return this;
}

/**
 * Multiply the matrix for scaling from the right.
 * @param x The scale factor along the X axis
 * @param y The scale factor along the Y axis
 * @param z The scale factor along the Z axis
 * @return this
 */
function scale(x: number, y: number, z: number) {
    var e = this.elements;
    e[0] *= x;
    e[4] *= y;
    e[8] *= z;
    e[1] *= x;
    e[5] *= y;
    e[9] *= z;
    e[2] *= x;
    e[6] *= y;
    e[10] *= z;
    e[3] *= x;
    e[7] *= y;
    e[11] *= z;
    return this;
}

/**
 * Set the viewing matrix.
 * @param eyeX, eyeY, eyeZ The position of the eye point.
 * @param centerX, centerY, centerZ The position of the reference point.
 * @param upX, upY, upZ The direction of the up vector.
 * @return this
 */
function setLookAt(
    eyeX: number,
    eyeY: number,
    eyeZ: number,
    centerX: number,
    centerY: number,
    centerZ: number,
    upX: number,
    upY: number,
    upZ: number
) {
    var e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;

    fx = centerX - eyeX;
    fy = centerY - eyeY;
    fz = centerZ - eyeZ;

    // Normalize f.
    rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
    fx *= rlf;
    fy *= rlf;
    fz *= rlf;

    // Calculate cross product of f and up.
    sx = fy * upZ - fz * upY;
    sy = fz * upX - fx * upZ;
    sz = fx * upY - fy * upX;

    // Normalize s.
    rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
    sx *= rls;
    sy *= rls;
    sz *= rls;

    // Calculate cross product of s and f.
    ux = sy * fz - sz * fy;
    uy = sz * fx - sx * fz;
    uz = sx * fy - sy * fx;

    // Set to this.
    e = this.elements;
    e[0] = sx;
    e[1] = ux;
    e[2] = -fx;
    e[3] = 0;

    e[4] = sy;
    e[5] = uy;
    e[6] = -fy;
    e[7] = 0;

    e[8] = sz;
    e[9] = uz;
    e[10] = -fz;
    e[11] = 0;

    e[12] = 0;
    e[13] = 0;
    e[14] = 0;
    e[15] = 1;

    // Translate.
    return this.translate(-eyeX, -eyeY, -eyeZ);
}

/**
 * Set the orthographic projection matrix.
 * @param left The coordinate of the left of clipping plane.
 * @param right The coordinate of the right of clipping plane.
 * @param bottom The coordinate of the bottom of clipping plane.
 * @param top The coordinate of the top top clipping plane.
 * @param near The distances to the nearer depth clipping plane. This value is minus if the plane is to be behind the viewer.
 * @param far The distances to the farther depth clipping plane. This value is minus if the plane is to be behind the viewer.
 * @return this
 */
function setOrtho(
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number
) {
    var e, rw, rh, rd;

    if (left === right || bottom === top || near === far) {
        throw 'null frustum';
    }

    rw = 1 / (right - left);
    rh = 1 / (top - bottom);
    rd = 1 / (far - near);

    e = this.elements;

    e[0] = 2 * rw;
    e[1] = 0;
    e[2] = 0;
    e[3] = 0;

    e[4] = 0;
    e[5] = 2 * rh;
    e[6] = 0;
    e[7] = 0;

    e[8] = 0;
    e[9] = 0;
    e[10] = -2 * rd;
    e[11] = 0;

    e[12] = -(right + left) * rw;
    e[13] = -(top + bottom) * rh;
    e[14] = -(far + near) * rd;
    e[15] = 1;

    return this;
}

/**
 * Set the perspective projection matrix by fovy and aspect.
 * @param fovy The angle between the upper and lower sides of the frustum.
 * @param aspect The aspect ratio of the frustum. (width/height)
 * @param near The distances to the nearer depth clipping plane. This value must be plus value.
 * @param far The distances to the farther depth clipping plane. This value must be plus value.
 * @return this
 */
function setPerspective(
    fovy: number,
    aspect: number,
    near: number,
    far: number
): Matrix4 {
    var e, rd, s, ct;

    if (near === far || aspect === 0) {
        throw 'null frustum';
    }
    if (near <= 0) {
        throw 'near <= 0';
    }
    if (far <= 0) {
        throw 'far <= 0';
    }

    fovy = (Math.PI * fovy) / 180 / 2;
    s = Math.sin(fovy);
    if (s === 0) {
        throw 'null frustum';
    }

    rd = 1 / (far - near);
    ct = Math.cos(fovy) / s;

    e = this.elements;

    e[0] = ct / aspect;
    e[1] = 0;
    e[2] = 0;
    e[3] = 0;

    e[4] = 0;
    e[5] = ct;
    e[6] = 0;
    e[7] = 0;

    e[8] = 0;
    e[9] = 0;
    e[10] = -(far + near) * rd;
    e[11] = -1;

    e[12] = 0;
    e[13] = 0;
    e[14] = -2 * near * far * rd;
    e[15] = 0;

    return this;
}

/**
 * Multiply the perspective projection matrix from the right.
 * @param fovy The angle between the upper and lower sides of the frustum.
 * @param aspect The aspect ratio of the frustum. (width/height)
 * @param near The distances to the nearer depth clipping plane. This value must be plus value.
 * @param far The distances to the farther depth clipping plane. This value must be plus value.
 * @return this
 */
function perspective(fovy: number, aspect: number, near: number, far: number) {
    return this.concat(new Matrix4().setPerspective(fovy, aspect, near, far));
}

/**
 * Copy matrix.
 * @param src source matrix
 * @return this
 */
function set(src: Matrix4) {
    var i, s, d;

    s = src.elements;
    d = this.elements;

    if (s === d) {
        return;
    }

    for (i = 0; i < 16; ++i) {
        d[i] = s[i];
    }

    return this;
}

/**
 * Multiply the viewing matrix from the right.
 * @param eyeX, eyeY, eyeZ The position of the eye point.
 * @param centerX, centerY, centerZ The position of the reference point.
 * @param upX, upY, upZ The direction of the up vector.
 * @return this
 */
function lookAt(
    eyeX: number,
    eyeY: number,
    eyeZ: number,
    centerX: number,
    centerY: number,
    centerZ: number,
    upX: number,
    upY: number,
    upZ: number
): Matrix4 {
    return this.concat(
        new Matrix4().setLookAt(
            eyeX,
            eyeY,
            eyeZ,
            centerX,
            centerY,
            centerZ,
            upX,
            upY,
            upZ
        )
    );
}
