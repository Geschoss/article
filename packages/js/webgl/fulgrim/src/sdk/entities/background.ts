import { store } from '../features/state';

const toRGB = 2.55 * 100;
export const background = (red = 0, green = red, blue = red, alpha = 1) => {
    const { gl } = store;

    gl.clearColor(red / toRGB, green / toRGB, blue / toRGB, alpha);
    gl.clear(gl.COLOR_BUFFER_BIT);
};
