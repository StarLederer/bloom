import { getPoint, getPrecomputedShape, getValues } from "~/calculations";

const drawCurves = (
  ctx: CanvasRenderingContext2D,
  shape: number[][],
  color: string
) => {
  const x = ctx.canvas.width;
  const y = ctx.canvas.height;

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
  const values = getValues(shapeP, mips);

  const x = ctx.canvas.width;
  const y = ctx.canvas.height;

  // // Draw distances
  // ctx.strokeStyle = "#fff4";
  // values.forEach((val, i) => {
  //   if (!ctx) return;

  //   const t = i / (values.length - 1);
  //   const r = x / 2;
  //   const px = Math.sin(t * Math.PI / 2) * r * val;
  //   const py = -Math.cos(t * Math.PI / 2) * r * val;

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