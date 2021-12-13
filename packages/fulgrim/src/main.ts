import './style.css';

import { Triangle } from './chapters/4/main';
import { TexturedQuad } from './chapters/5/TexturedQuad';
import { Shaders } from './chapters/6';
import { Starfield } from './coding_challenge/startgield';

const main = () => {
    Shaders();
};

document.addEventListener('DOMContentLoaded', main);
