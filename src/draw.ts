import type p5 from "p5";


export let gloria: p5.Image;

export const preload = (p: p5): void => {
  gloria = p.loadImage("pose_pien.png");
}

const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';

/** This is a draw function. */
export const draw = (p: p5): void => {

  // let w = p.width / gloria.width;
  // let h = p.height / gloria.height;
  // gloria.resize(48, 0);
  // gloria.loadPixels();
  // for (let i = 0; i < gloria.width; i++) {
  //   for (let j = 0; j < gloria.height; j++) {
  //     const pixelIndex = (i + j * gloria.width) * 4;
  //     const r = gloria.pixels[pixelIndex + 0]!;
  //     const g = gloria.pixels[pixelIndex + 1]!;
  //     const b = gloria.pixels[pixelIndex + 2]!;
  //     const avg = (r + g + b) / 3;

  //     p.noStroke();
  //     p.fill(255);
  //     // p.square(i * w, j * h, w);

  //     const len = density.length;
  //     const charIndex = p.floor(p.map(avg, 0, 255, len, 0));

  //     p.textSize(w);
  //     p.textAlign(p.CENTER, p.CENTER);
  //     p.text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
  //   }
  // }
};
