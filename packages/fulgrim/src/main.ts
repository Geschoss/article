import './style.css';

// code challenge
import { Starfield } from './coding_challenge/startgield';
// webGL book
import { Triangle } from './chapters/4/main';
import { TexturedQuad } from './chapters/5/TexturedQuad';
import { Shaders } from './chapters/6';
import { LookAtTriangles } from './chapters/7/LookAtTriangles';

const main = () => {
    LookAtTriangles();
};

document.addEventListener('DOMContentLoaded', main);
