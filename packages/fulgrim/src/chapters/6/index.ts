import {
    setup,
    draw,
    canvas,
    background,
    shaders,
    point,
} from '../../sdk';
import { fragmetn, vertex } from './shaders';

export const Shaders = () => {
    setup((state) => {
        canvas(600, 600);
        background();

        shaders(vertex, fragmetn);
    });

    draw(() => {
        point(0.4, 0.4, 10);
        point(-0.4, -0.4, 10);
    });
};
