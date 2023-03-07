import type p5 from "p5";

export class Range {
  constructor(public from: number, public to: number) { }
}

export const ascii = new Range(0x20, 0xff);
export const cjkUnifiedIdeographs = new Range(0x4e00, 0x9fff);
export const hiragana = new Range(0x3040, 0x3096);
export const katakana = new Range(0x30A1, 0x30FF);

export const generateDensityTable = (p: p5, codePointRange: Range, filename: string): void => {

  let writer = p.createWriter(filename)
  for (let codePoint = codePointRange.from; codePoint <= codePointRange.to; codePoint++) {
    const char = String.fromCodePoint(codePoint);

    const [rate, quadrant_rates, is_tofu] = getCharDensity(p, char);
    if (!is_tofu) {
      const printchar = (codePoint == 34) ? "" : char;
      writer.write([`0x${codePoint.toString(16).toUpperCase()},"${printchar}",${rate},${quadrant_rates}`, "\n"]);
    } else {
      // console.log(`${char} is tofu`);
    }
  }
  writer.close();
}

const getCharDensity = (p: p5, char: String): [number, number[], boolean] => {
  // Draw black letter on white background
  p.background(255);
  p.fill(0);

  p.textSize(p.width);
  p.textAlign(p.CENTER, p.CENTER);
  p.text(char, p.width / 2, p.height / 2);

  // Count the pixels
  let canvas = p.get();
  canvas.loadPixels();
  let white = 0;
  let black = 0;
  let quadrant_white = [0, 0, 0, 0];
  let quadrant_black = [0, 0, 0, 0];
  for (let i = 0; i < canvas.width; i++) {
    for (let j = 0; j < canvas.height; j++) {
      const quadrant_x = i >= canvas.width / 2;
      const quadrant_y = j >= canvas.height / 2;
      let quadrant = 0;
      if (quadrant_x) {
        quadrant = quadrant_y ? 0 : 3;
      } else {
        quadrant = quadrant_y ? 1 : 2;
      }

      const pixelIndex = (i + j * canvas.width) * 4;
      const r = canvas.pixels[pixelIndex + 0]!;
      const g = canvas.pixels[pixelIndex + 1]!;
      const b = canvas.pixels[pixelIndex + 2]!;
      if (r > 0) {
        white++;
        quadrant_white[quadrant]++;
      } else {
        black++;
        quadrant_black[quadrant]++;
      }
    }
  }
  const rate = black / (white + black);
  const isTofu = rate == (30940 / (white + black))
  const quadrant_rates = zip(quadrant_black, quadrant_white)
    .map(x => x[0] / (x[0] + x[1]));
  return [rate, quadrant_rates, isTofu];
}

function zip<T, U>(a: Array<T>, b: Array<U>): Array<[T, U]> {
  return a.map((k, i) => [k, b[i]!]);
}
