import { drawLines, drawPoints } from '../entities';
import { store } from './state';

export const setup = (cb: (s: typeof store) => void) => {
    cb(store);
};

export const draw = (cb: (s: typeof store, time: number) => void) => {
    let start = 0;
    const tick = () => {
        requestAnimationFrame((time) => {
            const { gl, points, lines } = store;

            gl.clear(gl.COLOR_BUFFER_BIT);

            cb(store, Math.floor(time - start));

            if (points.length > 0) {
                drawPoints();
            }

            if (lines.length > 0) {
                drawLines();
            }
            start = time;
            tick();
        });
    };
    tick();
};
