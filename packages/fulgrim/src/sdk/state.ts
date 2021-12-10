export const createState = () => {
    let gl: WebGLRenderingContext;
    let canvas: HTMLCanvasElement;
    let program: WebGLProgram;
    let points: number[] = [];
    let lines: number[] = [];

    return {
        init(props) {
            gl = props.gl;
            canvas = props.canvas;
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
        set program(value) {
            program = value;
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
    };
};
