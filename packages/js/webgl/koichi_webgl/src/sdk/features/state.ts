// TODO упростить
export const createStore = () => {
    let gl: WebGLRenderingContext;
    let canvas: HTMLCanvasElement;
    let program: WebGLProgram;

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
        }
    };
};

export const store = createStore();
