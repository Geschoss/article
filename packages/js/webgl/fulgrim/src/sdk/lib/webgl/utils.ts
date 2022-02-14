/**
 * Creates a webgl context. If creation fails it will
 * change the contents of the container of the <canvas>
 * tag to an error message with the correct links for WebGL.
 * @param {Element} canvas. The canvas element to create a
 *     context from.
 * @param {WebGLContextCreationAttirbutes} opt_attribs Any
 *     creation attributes you want to pass in.
 * @return {WebGLRenderingContext} The created context.
 */
export const setupWebGL = function (
    canvas: HTMLCanvasElement,
    opt_attribs?: WebGLContextAttributes
) {
    canvas.addEventListener(
        'webglcontextcreationerror',
        function (event) {
            console.error(event);
        },
        false
    );

    try {
        return canvas.getContext('webgl2', opt_attribs);
    } catch (e) {
        console.log('Error on create context!!!');
        throw e;
    }
};
