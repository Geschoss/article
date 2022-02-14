/**
 * Create the linked program object
 * @param gl GL context
 * @return created program object, or null if the creation has failed
 */
export const createProgram = (gl: WebGLRenderingContext) => {
    var program = gl.createProgram();
    if (!program) {
        console.log('Error on creating programm!!!');
        throw new Error('Error on creating programm!!!');
    }

    return program;
};
