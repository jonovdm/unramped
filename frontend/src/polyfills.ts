import { Buffer } from 'buffer';
import Process from "process";

window.global = window.global ?? window;
window.Buffer = window.Buffer ?? Buffer;
window.process = window.process ?? Process; // Minimal process polyfill

export { };