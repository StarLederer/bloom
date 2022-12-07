import { remStringToPx } from "../util";
import { theme } from "../../unocss-preset";
import {
  lerp,
  getPrecomputedShape,
  getRange,
  getPoint,
  getValues
} from "../calculations.js";

const component = (target: HTMLCanvasElement, shape: number[][]) => {
  const ctx = target.getContext("2d");
  if (!ctx) throw Error("No context");

  const x = target.width;
  const y = target.height;

  const values = getValues(shape);

  ctx.clearRect(0, 0, x, y);

  // Draw gridlines
  ctx.strokeStyle = "#fff2";
  values.forEach((_, i) => {
    const t = i > 0 ? shape[i-1][0] : 0;
    const r = x / 2;
    const px = Math.sin(t * Math.PI / 2) * r;
    const py = -Math.cos(t * Math.PI / 2) * r;

    ctx.beginPath();

    ctx.moveTo(x / 2, y);
    ctx.lineTo(x / 2 + px, y + py);

    if (i > 0) {
      ctx.moveTo(x / 2, y);
      ctx.lineTo(x / 2 - px, y + py);
    }

    ctx.stroke();
  })

  // Draw distances
  ctx.strokeStyle = "#fff4";
  values.forEach((val, i) => {
    const t = i > 0 ? shape[i-1][0] : 0;
    const r = x / 2;
    const px = Math.sin(t * Math.PI / 2) * r * val;
    const py = -Math.cos(t * Math.PI / 2) * r * val;

    ctx.beginPath();

    ctx.moveTo(x / 2, y);
    ctx.lineTo(x / 2 + px, y + py);

    if (i > 0) {
      ctx.moveTo(x / 2, y);
      ctx.lineTo(x / 2 - px, y + py);
    }

    ctx.stroke();
  })

  // Draw blob
  ctx.strokeStyle = "#fff";
  for (let i = 0; i < values.length - 1; ++i) {
    const r = x / 2;

    const val1 = values[i];
    const t1 = i > 0 ? shape[i-1][0] : 0;
    const px1 = Math.sin(t1 * Math.PI / 2) * r * val1;
    const py1 = -Math.cos(t1 * Math.PI / 2) * r * val1;

    const val2 = values[i + 1];
    const t2 = i > 0 ? shape[i][0] : 0;
    const px2 = Math.sin(t2 * Math.PI / 2) * r * val2;
    const py2 = -Math.cos(t2 * Math.PI / 2) * r * val2;

    ctx.beginPath();

    ctx.moveTo(x / 2 + px1, y + py1);
    ctx.lineTo(x / 2 + px2, y + py2);

    ctx.moveTo(x / 2 - px1, y + py1);
    ctx.lineTo(x / 2 - px2, y + py2);

    ctx.stroke();
  }

  return target;
};

export default component;
