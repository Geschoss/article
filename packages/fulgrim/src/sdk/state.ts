export const createState = () => {
    let canvas: HTMLCanvasElement;
    let gl: WebGLRenderingContext;

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
    };
};
