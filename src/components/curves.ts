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

  ctx.clearRect(0, 0, x, y);

  // Draw axis
  ctx.fillStyle = "#fff2";
  ctx.fillRect(0, 0, x, 1);
  ctx.fillRect(0, 0, 1, y);

  // Draw curves
  ctx.strokeStyle = "#fff";
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

  // Draw points
  ctx.fillStyle = "#fff";
  const r = remStringToPx(theme.wrapp.sizes['s--']);
  shape.forEach((p) => {
    // strokeWeight(20);
    // stroke(color('black'));
    ctx.beginPath();
    ctx.arc(p[0] * x, p[1] * y, r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Add mouse listener

  return target;
};

export default component;
