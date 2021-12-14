import { initShaders } from "../lib/webgl";
import { store } from "./state";

export const shaders = (vertex: string, fragment: string) => {
    const { gl, program } = store;

    initShaders(gl, program, vertex, fragment);
};
