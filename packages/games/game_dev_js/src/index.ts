import './style.css'
import { range } from 'ramda'
import slowpoke_url from './images/slowpoke.png'
import { fragment_raw } from './fragment'
import { vertex_raw } from './vertex'
import { webglLessonsUI } from './utils/webgl-lessons-ui'
import { webglUtils } from './utils/webgl-utils'
import { m4 } from './utils/m4'

type God = {
  gl: WebGL2RenderingContext
}

const images = [slowpoke_url]
const CANVAS_ID = 'canvasId'

Promise.all([init(CANVAS_ID), images_manager(images)]).then(
  ([god, assets]) => {
    const { gl } = god
    const program = create_program(god, vertex_raw, fragment_raw)
    webglUtils.resizeCanvasToDisplaySize(
      gl.canvas as HTMLCanvasElement
    )
    gl.enable(gl.DEPTH_TEST);
    let position_attribute_location = gl.getAttribLocation(
      program,
      'a_position'
    )
    var colorAttributeLocation = gl.getAttribLocation(
      program,
      'a_color'
    )
    var matrixLocation = gl.getUniformLocation(program, 'u_matrix')

    let postition_buffer = gl.createBuffer()

    let vao = gl.createVertexArray()
    gl.bindVertexArray(vao)
    gl.enableVertexAttribArray(position_attribute_location)
    gl.bindBuffer(gl.ARRAY_BUFFER, postition_buffer)

    setGeometry(god)

    {
      let size = 3
      let type = gl.FLOAT
      let normalize = false
      let stride = 0
      let offset = 0
      gl.vertexAttribPointer(
        position_attribute_location,
        size,
        type,
        normalize,
        stride,
        offset
      )
    }
    var colorBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    setColors(gl)

    // Turn on the attribute
    gl.enableVertexAttribArray(colorAttributeLocation)

    // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
    var size = 3 // 3 components per iteration
    var type = gl.UNSIGNED_BYTE // the data is 8bit unsigned bytes
    var normalize = true // convert from 0-255 to 0.0-1.0
    var stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next color
    var offset = 0 // start at the beginning of the buffer
    gl.vertexAttribPointer(
      colorAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    )

    let translation = [150, 100, 100]
    let rotation = [0, 0, 0]
    let scale = [1, 1, 1]

    webglLessonsUI.setupSlider('#x', {
      max: gl.canvas.width,
      slide: updatePosition(0),
      value: translation[0],
    })
    webglLessonsUI.setupSlider('#y', {
      max: gl.canvas.height,
      slide: updatePosition(1),
      value: translation[1],
    })
    webglLessonsUI.setupSlider('#z', {
      max: gl.canvas.height,
      slide: updatePosition(2),
      value: translation[2],
    })
    webglLessonsUI.setupSlider('#scaleX', {
      max: 10,
      slide: updateScale(0),
      value: scale[0],
    })
    webglLessonsUI.setupSlider('#scaleY', {
      max: 10,
      slide: updateScale(1),
      value: scale[1],
    })
    webglLessonsUI.setupSlider('#scaleZ', {
      max: 10,
      slide: updateScale(2),
      value: scale[2],
    })
    webglLessonsUI.setupSlider('#angleX', {
      max: 360,
      slide: updateRotate(0),
      value: rotation[0],
    })
    webglLessonsUI.setupSlider('#angleY', {
      max: 360,
      slide: updateRotate(1),
      value: rotation[1],
    })
    webglLessonsUI.setupSlider('#angleZ', {
      max: 360,
      slide: updateRotate(2),
      value: rotation[2],
    })

    function updateScale(index: number) {
      return (_, { value }) => {
        scale[index] = value
        drawScene()
      }
    }
    function updateRotate(i) {
      return (_, ui) => {
        rotation[i] = (ui.value * Math.PI) / 180
        drawScene()
      }
    }

    function updatePosition(index: number) {
      return (_, ui) => {
        translation[index] = ui.value
        drawScene()
      }
    }

    drawScene()

    function drawScene() {
      webglUtils.resizeCanvasToDisplaySize(
        gl.canvas as HTMLCanvasElement
      )

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.useProgram(program)
      gl.bindVertexArray(vao)

      gl.bindBuffer(gl.ARRAY_BUFFER, postition_buffer)

      range(0, 5).forEach((i) => {
        let matrix = m4.projection(
          gl.canvas.clientWidth,
          gl.canvas.clientHeight,
          400
        )
        matrix = m4.translate(
          matrix,
          translation[0],
          translation[1],
          translation[2]
        )
        matrix = m4.xRotate(matrix, rotation[0])
        matrix = m4.yRotate(matrix, rotation[1])
        matrix = m4.zRotate(matrix, rotation[2])
        matrix = m4.scale(matrix, scale[0], scale[1], scale[2])

        gl.uniformMatrix4fv(matrixLocation, false, matrix)

        {
          let count = 16 * 6
          let offset = 0
          let primitive_type = gl.TRIANGLES
          gl.drawArrays(primitive_type, offset, count)
        }
      })
    }
  }
)
function setColors(gl) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Uint8Array([
      // left column front
      200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70,
      120, 200, 70, 120,

      // top rung front
      200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70,
      120, 200, 70, 120,

      // middle rung front
      200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70,
      120, 200, 70, 120,

      // left column back
      80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200,
      80, 70, 200,

      // top rung back
      80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200,
      80, 70, 200,

      // middle rung back
      80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200,
      80, 70, 200,

      // top
      70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200,
      210, 70, 200, 210,

      // top rung right
      200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200,
      200, 70, 200, 200, 70,

      // under top rung
      210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210,
      100, 70, 210, 100, 70,

      // between top rung and middle
      210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 210,
      160, 70, 210, 160, 70,

      // top of middle rung
      70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180,
      210, 70, 180, 210,

      // right of middle rung
      100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70,
      210, 100, 70, 210,

      // bottom of middle rung.
      76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210,
      100, 76, 210, 100,

      // right of bottom
      140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140,
      210, 80, 140, 210, 80,

      // bottom
      90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130,
      110, 90, 130, 110,

      // left side
      160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220, 160,
      160, 220, 160, 160, 220,
    ]),
    gl.STATIC_DRAW
  )
}

function setGeometry(god: God) {
  god.gl.bufferData(
    god.gl.ARRAY_BUFFER,
    new Float32Array([
      // left column front
      0, 0, 0, 30, 0, 0, 0, 150, 0, 0, 150, 0, 30, 0, 0, 30, 150, 0,

      // top rung front
      30, 0, 0, 100, 0, 0, 30, 30, 0, 30, 30, 0, 100, 0, 0, 100, 30,
      0,

      // middle rung front
      30, 60, 0, 67, 60, 0, 30, 90, 0, 30, 90, 0, 67, 60, 0, 67, 90,
      0,

      // left column back
      0, 0, 30, 30, 0, 30, 0, 150, 30, 0, 150, 30, 30, 0, 30, 30, 150,
      30,

      // top rung back
      30, 0, 30, 100, 0, 30, 30, 30, 30, 30, 30, 30, 100, 0, 30, 100,
      30, 30,

      // middle rung back
      30, 60, 30, 67, 60, 30, 30, 90, 30, 30, 90, 30, 67, 60, 30, 67,
      90, 30,

      // top
      0, 0, 0, 100, 0, 0, 100, 0, 30, 0, 0, 0, 100, 0, 30, 0, 0, 30,

      // top rung right
      100, 0, 0, 100, 30, 0, 100, 30, 30, 100, 0, 0, 100, 30, 30, 100,
      0, 30,

      // under top rung
      30, 30, 0, 30, 30, 30, 100, 30, 30, 30, 30, 0, 100, 30, 30, 100,
      30, 0,

      // between top rung and middle
      30, 30, 0, 30, 30, 30, 30, 60, 30, 30, 30, 0, 30, 60, 30, 30,
      60, 0,

      // top of middle rung
      30, 60, 0, 30, 60, 30, 67, 60, 30, 30, 60, 0, 67, 60, 30, 67,
      60, 0,

      // right of middle rung
      67, 60, 0, 67, 60, 30, 67, 90, 30, 67, 60, 0, 67, 90, 30, 67,
      90, 0,

      // bottom of middle rung.
      30, 90, 0, 30, 90, 30, 67, 90, 30, 30, 90, 0, 67, 90, 30, 67,
      90, 0,

      // right of bottom
      30, 90, 0, 30, 90, 30, 30, 150, 30, 30, 90, 0, 30, 150, 30, 30,
      150, 0,

      // bottom
      0, 150, 0, 0, 150, 30, 30, 150, 30, 0, 150, 0, 30, 150, 30, 30,
      150, 0,

      // left side
      0, 0, 0, 0, 0, 30, 0, 150, 30, 0, 0, 0, 0, 150, 30, 0, 150, 0,
    ]),
    god.gl.STATIC_DRAW
  )
}

function setRectangle(
  god: God,
  x: number,
  y: number,
  width: number,
  height: number
) {
  let x1 = x
  let x2 = x + width
  let y1 = y
  let y2 = y + height
  god.gl.bufferData(
    god.gl.ARRAY_BUFFER,
    new Float32Array([
      x1,
      y1,
      x2,
      y1,
      x1,
      y2,
      x1,
      y2,
      x2,
      y1,
      x2,
      y2,
    ]),
    god.gl.STATIC_DRAW
  )
}

async function init(id: string) {
  const canvas = document.getElementById(id) as
    | HTMLCanvasElement
    | undefined

  if (!canvas) {
    error("Can't find canvas element!")
  }

  const gl = canvas.getContext('webgl2')
  if (!gl) {
    error("webgl2 don't support!")
  }

  return {
    gl,
  }
}

// utils
async function images_manager(images: string[]) {
  return Promise.all(images.map(load_image))
}
async function load_image(src: string) {
  return new Promise<HTMLImageElement>((res, rej) => {
    let image = new Image()
    image.onload = () => {
      res(image)
    }
    image.onerror = (event) => {
      rej(event)
    }
    image.src = src
  })
}

function init_shaders(
  god: God,
  vertex_raw: string,
  fragment_raw: string
) {
  return [
    create_shader(god, god.gl.VERTEX_SHADER, vertex_raw),
    create_shader(god, god.gl.FRAGMENT_SHADER, fragment_raw),
  ] as const
}
function create_program(
  god: God,
  vertex_raw: string,
  fragment_raw: string
) {
  const { gl } = god
  const [vertex_shader, fragment_shader] = init_shaders(
    god,
    vertex_raw,
    fragment_raw
  )
  const program = gl.createProgram()
  gl.attachShader(program, vertex_shader)
  gl.attachShader(program, fragment_shader)
  gl.linkProgram(program)
  let success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) {
    return program
  }
  let msg = gl.getProgramInfoLog(program)
  gl.deleteProgram(program)
  error(msg)
}
function create_shader(god: God, type: number, source: string) {
  const { gl } = god
  let shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (success) {
    return shader
  }
  let msg = gl.getShaderInfoLog(shader)
  gl.deleteShader(shader)
  error(msg)
}

function error(msg: string): never {
  throw new Error(msg)
}

function randomInt(range: number) {
  return Math.floor(Math.random() * range)
}
