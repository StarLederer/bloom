import { Component, createEffect } from "solid-js";
import { remStringToPx } from "~/util";
import { theme } from "~/../unocss-preset";

type IProps = {
  width: number;
  height: number;
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

    const x = props.width;
    const y = props.height;
    cnv.width = x;
    cnv.height = y;

    ctx.clearRect(0, 0, x, y);

    // Draw axis
    ctx.fillStyle = "#fff2";
    ctx.fillRect(0, 0, x, 1);
    ctx.fillRect(0, 1, 1, y);

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
    <canvas ref={cnv} style="transform: scaleY(-1)"></canvas>
  )
};

export default Main;
