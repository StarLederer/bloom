import { Component, Signal } from "solid-js";
import { theme } from "~/../unocss-preset";
import { remStringToPx } from "~/util";
import { drawCurves } from "../render functions/pointBased";
import Canvas from "./Canvas";
import { getCurveColor } from "../colors";

const Main: Component<{
  shape: Signal<number[][]>;
  colorI: number;
}> = (props) => {
  const render = () => (ctx: CanvasRenderingContext2D) => {
    // Clear pass
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Grid pass
    const x = ctx.canvas.width;
    const y = ctx.canvas.height;

    ctx.fillStyle = "#fff2";
    ctx.fillRect(0, 0, x, 1);
    ctx.fillRect(0, 0, 1, y);

    const [shape, setShape] = props.shape;

    // Draw curves
    drawCurves(ctx, shape(), getCurveColor(props.colorI));

    // Draw points
    ctx.fillStyle = "#fff";
    const r = remStringToPx(theme.wrapp.sizes['s--']);
    shape().forEach((p) => {
      // strokeWeight(20);
      // stroke(color('black'));
      ctx?.beginPath();
      ctx?.arc(p[0] * x, p[1] * y, r, 0, Math.PI * 2);
      ctx?.fill();
    });
  };

  const eventListeners = () => ({
    "contextmenu": (ev: MouseEvent) => {
      ev.preventDefault();
    },
    "mousedown": (ev: MouseEvent) => {
      const cnv = ev.target as HTMLCanvasElement;
      if (!cnv) return;

      const [shape, setShape] = props.shape;

      ev.cancelBubble = true;
      ev.stopPropagation();
      ev.preventDefault();

      var rect = (ev.target as HTMLElement).getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;

      const newPoint = [
        x / cnv.width,
        y / cnv.height,
      ];

      let crate = true;
      shape().forEach((point, i) => {
        if (Math.sqrt(Math.pow(point[0] - newPoint[0], 2) + Math.pow(point[1] - newPoint[1], 2)) < 0.1) {
          switch (ev.button) {
            case 0:
              if (i === 0) {
                newPoint[0] = 0;
              } else if (i === shape().length - 1) {
                newPoint[0] = 1;
              }
              setShape((prev) => {
                prev[i] = newPoint;
                return [...prev];
              });
              break;
            case 2:
              if (i > 0 && i < shape().length - 1) {
                setShape((prev) => {
                  prev.splice(i, 1);
                  return [...prev]
                });
              }
              break;
          }
          crate = false;
        }
      });

      if (crate && ev.button === 0) {
        setShape((prev) => {
          return [...prev, newPoint].sort((a, b) => (a[0] - b[0]));
        });
      }
    },
  });

  return (
    <>
      <Canvas render={render()} eventListeners={eventListeners()} />
      <p style="user-select: all">
        {props.shape[0]().map((point) => (
          <div>
            [
            {Math.round((point[0] + Number.EPSILON) * 100) / 100},
            {Math.round((point[1] + Number.EPSILON) * 100) / 100}
            ]
          </div>
        ))}
      </p>
    </>

  )
};

export default Main;
