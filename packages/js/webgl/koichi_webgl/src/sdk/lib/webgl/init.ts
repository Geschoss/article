import { warn } from '../std';
import { setupWebGL } from './utils';

/**
 * Initialize and get the rendering for WebGL
 * @param canvas <cavnas> element
 * @param opt_debug flag to initialize the context for debugging
 * @return the rendering context for WebGL
 */
export const getWebGLContext = (
    canvas: HTMLCanvasElement
): WebGLRenderingContext => {
    // Get the rendering context for WebGL
    var gl = setupWebGL(canvas);
    if (!gl) {
        warn('Failed to create context');
        throw Error('Failed to create context');
    }

    return gl;
};
