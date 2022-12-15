import { Component, createEffect, Signal } from "solid-js";
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
  shapeSignal: Signal<number[][]>;
};

const Main: Component<IProps> = (props) => {
  let cnv: HTMLCanvasElement | undefined;

  // Draw
  createEffect(() => {
    if (!cnv) return;
    let ctx = cnv.getContext('2d');
    if (!ctx) return;

    const [shape, setShape] = props.shapeSignal;

    const x = cnv.width;
    const y = cnv.height;

    ctx.clearRect(0, 0, x, y);

    // Draw axis
    ctx.fillStyle = "#fff2";
    ctx.fillRect(0, 0, x, 1);
    ctx.fillRect(0, 0, 1, y);

    // Draw curves
    ctx.strokeStyle = "#fff";
    const shapeP = getPrecomputedShape(shape());
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
    shape().forEach((p) => {
      // strokeWeight(20);
      // stroke(color('black'));
      ctx?.beginPath();
      ctx?.arc(p[0] * x, p[1] * y, r, 0, Math.PI * 2);
      ctx?.fill();
    });
  });

  // Click listener
  createEffect(() => {
    if (!cnv) return;

    const [shape, setShape] = props.shapeSignal;

    cnv.addEventListener("contextmenu", (ev) => {
      ev.preventDefault();
    });

    cnv.addEventListener("mousedown", (ev) => {
      if (!cnv) return; // we shouldn't need this, I think. Typescript bug?

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
    });
  });

  return (
    <Canvas ref={cnv}></Canvas>
  )
};

export default Main;
