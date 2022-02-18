import { drawCube, drawLines, drawPoints, drawTriangles } from '../entities';
import { store } from './state';

export const setup = (cb: (s: typeof store) => void) => {
    cb(store);
};

export const draw = (cb: (s: typeof store, time: number) => void) => {
    let start = 0;
    const tick = () => {
        requestAnimationFrame((time) => {
            const { gl } = store;

            gl.clear(gl.COLOR_BUFFER_BIT);

            cb(store, Math.floor(time - start));

            drawCube();
            drawLines();
            drawPoints();
            drawTriangles();

            start = time;
            tick();
        });
    };
    tick();
};
