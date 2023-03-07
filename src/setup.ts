import type p5 from "p5";
import { generateDensityTable, hiragana, ascii } from "./generateDensity";

/** This is a setup function. */
export const setup = (p: p5): void => {
  p.createCanvas(640, 480);
  capture = p.createCapture(p.VIDEO);
  capture.hide();
  // generateDensityTable(p, ascii, "ascii.csv");
};

export let capture: any;

