import { Component, createEffect } from "solid-js";
import { remStringToPx } from "../../util";
import { theme } from "../../../unocss-preset";

import Canvas from "../Canvas";

type IProps = {
  shape: (x: number) => number;
  resolution: number;
};

const Main: Component<IProps> = (props) => {
  let cnv: HTMLCanvasElement | undefined;

  // Draw
  createEffect(() => {
    if (!cnv) return;
    let ctx = cnv.getContext('2d');
    if (!ctx) return;

    const x = cnv.width;
    const y = cnv.height;

    ctx.clearRect(0, 0, x, y);

    // Draw axis
    ctx.fillStyle = "#fff2";
    ctx.fillRect(0, 0, x, 1);
    ctx.fillRect(0, 0, 1, y);

    // Visualize function values
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.lineTo(0, props.shape(0) * y);
    for (let i = 1; i < props.resolution; ++i) {
      const px = i / (props.resolution - 1);
      const py = props.shape(px);
      ctx.lineTo(px * x, py * y);
    }
    ctx.stroke();
  });

  return (
    <Canvas ref={cnv}></Canvas>
  )
};

export default Main;
