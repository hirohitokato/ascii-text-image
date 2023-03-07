import type p5 from "p5";


export let image: p5.Image;

export const preload = (p: p5): void => {
  image = p.loadImage("pose_pien.png");
}

// const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
const density = "ÆMWØæ@¶ÐQÑBÔÖÕGÓNÒRODÊËÉÈ&ES$H¾ÇmÛ§Ü8ÃÂKÄ®ÅÚÙÁÀ6ZU©9CðPwAÞßþXã½%âåäêg0ë¼áàdb32qéè5p#õ¥ôøö£VFañûòóeühµ4ÿ¢kùúÝoýçYsTunzy±xJLc7¤×><v?=[]Ï¿Î{1}f+ÍÌt()Ij²îï³÷l^r|ìí¬ª!iº\¡/~»«¦°¹*;_-:', ";

/** This is a draw function. */

export const draw = (p: p5): void => {
  p.background(125);
  image.resize(60, 0);
  let w = p.width / image.width;
  let h = p.height / image.height;
  image.loadPixels();
  for (let i = 0; i < image.width; i++) {
    for (let j = 0; j < image.height; j++) {
      const pixelIndex = (i + j * image.width) * 4;
      const r = image.pixels[pixelIndex + 0]!;
      const g = image.pixels[pixelIndex + 1]!;
      const b = image.pixels[pixelIndex + 2]!;
      const a = image.pixels[pixelIndex + 3]!;
      const avg = (r + g + b) / 3;

      p.noStroke();
      p.fill(r, g, b, a);
      // p.square(i * w, j * h, w);

      const len = density.length;
      const charIndex = p.floor(p.map(avg, 0, 255, len, 0));

      p.textSize(w);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
    }
  }
};
