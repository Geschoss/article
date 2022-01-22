import './style.css';

// code challenge
import { Starfield } from './coding_challenge/startgield';
// webGL book
import { Triangle } from './chapters/4/main';
import { TexturedQuad } from './chapters/5/TexturedQuad';
import { Shaders } from './chapters/6';
import { LookAtTriangles } from './chapters/7/LookAtTriangles';
import { HelloCude } from './chapters/7/HelloCube';
import { ColoredCude } from './chapters/7/ColoredCube';
import { LightedCude } from './chapters/8_lightingObjects/LightedCube';

const main = () => {
    LightedCude();
};

document.addEventListener('DOMContentLoaded', main);
