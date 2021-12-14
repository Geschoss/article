// TODO упростить
export const createStore = () => {
    let gl: WebGLRenderingContext;
    let canvas: HTMLCanvasElement;
    let program: WebGLProgram;
    let lines: number[] = [];
    let points: number[] = [];
    let triangles: number[] = [];

    return {
        init(props) {
            gl = props.gl;
            canvas = props.canvas;
            program = props.program;
        },
        get width() {
            return canvas.width;
        },
        get height() {
            return canvas.height;
        },
        get gl() {
            return gl;
        },
        get program() {
            return program;
        },
        get points() {
            return points;
        },
        set points(value) {
            points = value;
        },
        get lines() {
            return lines;
        },
        set lines(value) {
            lines = value;
        },
        get triangles() {
            return triangles;
        },
    };
};

export const store = createStore();
