import { getPoint, getPrecomputedShape, getValues } from "~/calculations";

const getValuesPB = (shapeP: number[][], numMips: number) => {
  return getValues(
    (x) => getPoint(shapeP, x),
    numMips
  );
};

const drawCurves = (
  ctx: CanvasRenderingContext2D,
  shape: number[][],
  color: string
) => {
  const x = ctx.canvas.width - 1;
  const y = ctx.canvas.height - 1;

  ctx.strokeStyle = color;
  const shapeP = getPrecomputedShape(shape);
  {
    ctx.beginPath();
    // ctx.moveTo(0, getPoint(shapeP, 0));
    for (let i = 0; i < x; ++i) {
      const py = getPoint(shapeP, i / x);
      ctx.lineTo(i, py * y);
    }
    ctx.stroke();
  }
}
const drawProfile = (
  ctx: CanvasRenderingContext2D,
  shape: number[][],
  color: string
) => {
  // 8 is a approxmiately how many mips a 1080p screen would have.
  // This does not really affect the calculations but
  // more mips means better resolution but also a
  // smaller graph because everything always adds up to 1
  const mips = 8;

  const shapeP = getPrecomputedShape(shape);
  const values = getValuesPB(shapeP, mips);

  const x = ctx.canvas.width - 1;
  const y = ctx.canvas.height - 1;

  // // Draw distances
  // let c = color.split(', ');
  // values.forEach((val, i) => {
  //   if (!ctx) return;

  //   const t = i / (values.length - 1);
  //   const r = x / 2;
  //   const px = Math.sin(t * Math.PI / 2) * r;
  //   const py = -Math.cos(t * Math.PI / 2) * r;

  //   c[3] = val * 100 + "%)";
  //   ctx.strokeStyle = c.join(', ');

  //   ctx.beginPath();

  //   ctx.moveTo(x / 2, y);
  //   ctx.lineTo(x / 2 + px, y + py);

  //   if (i > 0) {
  //     ctx.moveTo(x / 2, y);
  //     ctx.lineTo(x / 2 - px, y + py);
  //   }

  //   ctx.stroke();
  // })

  // Draw blob
  ctx.strokeStyle = color;
  for (let i = 0; i < values.length - 1; ++i) {
    const r = x / 2;

    const val1 = values[i];
    const t1 = i / (values.length - 1);
    const px1 = Math.sin(t1 * Math.PI / 2) * r * val1;
    const py1 = -Math.cos(t1 * Math.PI / 2) * r * val1;

    const val2 = values[i + 1];
    const t2 = (i + 1) / (values.length - 1);
    const px2 = Math.sin(t2 * Math.PI / 2) * r * val2;
    const py2 = -Math.cos(t2 * Math.PI / 2) * r * val2;

    ctx.beginPath();

    ctx.moveTo(x / 2 + px1, y + py1);
    ctx.lineTo(x / 2 + px2, y + py2);

    ctx.moveTo(x / 2 - px1, y + py1);
    ctx.lineTo(x / 2 - px2, y + py2);

    ctx.stroke();
  }
};

export {
  drawCurves,
  drawProfile
};
