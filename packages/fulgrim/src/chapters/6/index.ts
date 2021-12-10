import {
    setup,
    draw,
    createCanvas,
    background,
    shaders,
    point,
} from '../../sdk';
import { fragmetn, vertex } from './shaders';

export const Shaders = () => {
    setup((state) => {
        createCanvas(400, 400);
        background();

        shaders(vertex, fragmetn);
    });

    draw(() => {
        point(0.4, 0.4);
        point(-0.4, -0.4);
    });
};
