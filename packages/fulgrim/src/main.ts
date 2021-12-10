import './style.css';

import { Starfield } from './chapters/common';
import { Triangle } from './chapters/4/main';
import { TexturedQuad } from './chapters/5/TexturedQuad';
import { Shaders } from './chapters/6';

const main = () => {
    Starfield();
};

document.addEventListener('DOMContentLoaded', main);
