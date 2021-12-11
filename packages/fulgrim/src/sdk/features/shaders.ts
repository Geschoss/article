import { initShaders } from "../lib/webgl";
import { store } from "./state";

export const shaders = (vertex: string, fragmetn: string) => {
    const { gl, program } = store;

    initShaders(gl, program, vertex, fragmetn);
};
