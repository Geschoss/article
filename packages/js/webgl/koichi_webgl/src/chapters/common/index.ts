import { setup, draw, canvas, background } from '../../sdk';

export const Common = () => {
    setup((state) => {
        canvas(800, 800);
        background();
    });

    draw((state) => {});
};
