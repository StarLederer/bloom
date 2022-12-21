import { getValues, lerp } from "~/calculations";

const shape = (x: number, i: number, h: number, a: number, b: number): number => {
  const c = Math.pow((2 * Math.pow(x, i)) - 1, 2);
  const sigmoid = (x: number, k: number) => {
    return (x - k * x) / (k - 2 * k * Math.abs(x) + 1)
  };
  const s = (1 + sigmoid(Math.pow(0.5, 1 / i) - x, -1)) / 2
  const d = lerp(b, a, s);
  return (1 - c * (1 - d)) * h;
}

const drawCurves = (
  ctx: CanvasRenderingContext2D,
  shape: (x: number) => number,
  resolution: number,
  color: string
) => {
  const x = ctx.canvas.width;
  const y = ctx.canvas.height;

  // Visualize function values
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.lineTo(0, shape(0) * y);
  for (let i = 1; i < resolution; ++i) {
    const px = i / (resolution - 1);
    const py = shape(px);
    ctx.lineTo(px * x, py * y);
  }
  ctx.stroke();
}

const drawProfile = (
  ctx: CanvasRenderingContext2D,
  shape: (x: number) => number,
  resolution: number,
  color: string
) => {
  const x = ctx.canvas.width - 1;
  const y = ctx.canvas.height - 1;

  const values = getValues(shape, resolution);

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
  shape,
  drawCurves,
  drawProfile
};
