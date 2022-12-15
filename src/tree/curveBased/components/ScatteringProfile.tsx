import { Component, createEffect } from "solid-js";
import { remStringToPx } from "../util";
import { theme } from "../../unocss-preset";
import {
  lerp,
  getPrecomputedShape,
  getRange,
  getPoint,
  getValues
} from "../calculations";
import Canvas from "./Canvas";

type IProps = {
  shape: number[][];
};

const Main: Component<IProps> = (props) => {
  // 8 is a approxmiately how many mips a 1080p screen would have.
  // This does not really affect the calculations but
  // more mips means better resolution but also a
  // smaller graph because everything always adds up to 1
  const mips = 8;

  let cnv: HTMLCanvasElement | undefined;

  createEffect(() => {
    if (!cnv) return;
    let ctx = cnv.getContext('2d');
    if (!ctx) return;

    const x = cnv.width;
    const y = cnv.height;

    const shapeP = getPrecomputedShape(props.shape);
    const values = getValues(shapeP, mips);

    ctx.clearRect(0, 0, x, y);

    // Draw gridlines
    ctx.strokeStyle = "#fff2";

    for (let i = 0; i < mips; ++i) {
      const t = i / (mips - 1);
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
    }

    // Draw distances
    ctx.strokeStyle = "#fff4";
    values.forEach((val, i) => {
      if (!ctx) return;

      const t = i / (values.length - 1);
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
  });

  return (
    <Canvas ref={cnv}></Canvas>
  )
};

export default Main;
