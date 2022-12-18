import { Component, createEffect, createSignal, ParentComponent, Signal } from "solid-js";
import { Route } from "~/ui/router";
import Button from "~/ui/primitives/Button";

import Canvas from "./components/Canvas";
import MathematicalOptions from "./components/MathematicalOptions";
import PointOptions from "./components/PointOptions";
import {
  shape as mathShape,
  drawCurves as drawCurvesMath,
  drawProfile as drawProfileMath
} from "./mathematical";
import { drawAxis, drawProfileGrid } from "./grids";
import {
  drawCurves as drawCurvesPB,
  drawProfile as drawProfilePB
} from "./pointBased";
import { getCurveColor, indexToHue } from "./colors";
import styles from "./style.module.css";

type IProps = {
  path: string;
};

const Configurator: ParentComponent<{
  name: string
  onRemove: () => void;
  hue: number
}> = (props) => {
  return (
    <div class="flex flex-col gap-s++ bg-srf pd-m0 round-m0 text-fg-1" style={`--hue: ${props.hue}`}>
      <h3 class="text-fg-0 font-bold">{props.name}</h3>
      {props.children}
      <div class="flex gap-s-">
        <Button onClick={props.onRemove} hue={0} class="flex-1 round-m0 pd-m0">
          <div class="i-mdi-remove" />
        </Button>
        {/* <Button onClick={props.onRemove} class="flex-1 round-m0">
          Show
        </Button> */}
      </div>
    </div>
  );
};

type IMathematicalCurve = {
  type: "mathematical";
  i: Signal<number>;
  h: Signal<number>;
  a: Signal<number>;
  b: Signal<number>;
}

type IPointCurve = {
  type: "point-based";
  shape: Signal<number[][]>;
}

type ICurve = IMathematicalCurve | IPointCurve;

const Main: Component<IProps> = (props) => {
  const [curves, setCurves] = createSignal<ICurve[]>([
    {
      type: "point-based",
      shape: createSignal([
        [0.0, 0.6],
        [0.2, 0.6],
        [0.4, 0.6],
        [0.6, 0.6],
        [0.8, 0.6],
        [1.0, 0.6],
      ]),
    },
    {
      type: "point-based",
      shape: createSignal([
        [0.0, 0.3],
        [0.1, 0.8],
        [0.2, 0.8],
        [0.3, 0.8],
        [0.4, 0.8],
        [0.5, 0.8],
        [0.6, 0.8],
        [0.7, 0.8],
        [0.8, 0.8],
        [0.9, 0.8],
        [1.0, 0.8],
      ]),
    },
    {
      type: "point-based",
      shape: createSignal([
        [0.0, 0.3],
        [0.1, 0.8],
        [0.5, 0.83],
        [0.9, 0.8],
        [1.0, 0.7],
      ]),
    }
  ]);

  let curveCanvas: HTMLCanvasElement | undefined;
  let profileCanvas: HTMLCanvasElement | undefined;

  // Draw curves
  createEffect(() => {
    if (curveCanvas) {
      let ctx = curveCanvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, curveCanvas.width, curveCanvas.height);
      drawAxis(ctx);
    };

    curves().forEach((curve, i) => {
      if (!curveCanvas) return;
      let ctx = curveCanvas.getContext('2d');
      if (!ctx) return;

      switch (curve.type) {
        case "mathematical":
          drawCurvesMath(
            ctx,
            (x: number): number => {
              return mathShape(x, curve.i[0](), curve.h[0](), curve.a[0](), curve.b[0]());
            },
            32,
            getCurveColor(i)
          );
          break;
        case "point-based":
          drawCurvesPB(ctx, curve.shape[0](), getCurveColor(i));
          break;
      }
    });
  });

  // Draw profiles
  createEffect(() => {
    if (profileCanvas) {
      let ctx = profileCanvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, profileCanvas.width, profileCanvas.height);
      drawProfileGrid(ctx, 8);
    };

    curves().forEach((curve, i) => {
      if (!profileCanvas) return;
      let ctx = profileCanvas.getContext('2d');
      if (!ctx) return;

      switch (curve.type) {
        case "mathematical":
          drawProfileMath(
            ctx,
            (x: number): number => {
              return mathShape(x, curve.i[0](), curve.h[0](), curve.a[0](), curve.b[0]());
            },
            8,
            getCurveColor(i))
          break;
        case "point-based":
          drawProfilePB(ctx, curve.shape[0](), getCurveColor(i));
          break;
      }
    });
  });

  return (
    <Route path={props.path} class="height-full flex items-stretch justify-center">
      <section class="flex flex-col items-stretch pd-m0 gap-s" style="overflow: scroll">
        {curves().map((curve, i) => (
          <Configurator
            hue={indexToHue(i)}
            name={curve.type}
            onRemove={() => {
              setCurves((curves) => {
                curves.splice(i, 1);
                return [...curves];
              });
            }}
          >
            {(() => {
              switch (curve.type) {
                case "mathematical":
                  return <MathematicalOptions
                    i={curve.i}
                    h={curve.h}
                    a={curve.a}
                    b={curve.b}
                  />;
                case "point-based":
                  return <PointOptions
                    shape={curve.shape}
                    colorI={i}
                  />;
              }
            })()}

          </Configurator>
        ))}

        <Button
          onClick={() => {
            setCurves((curves) => {
              return [...curves, {
                type: "mathematical",
                i: createSignal(0.5),
                h: createSignal(0.9),
                a: createSignal(0.3),
                b: createSignal(0.8),
              }];
            });
          }}
        >
          Add mathematical
        </Button>

        <Button
          onClick={() => {
            setCurves((curves) => {
              return [...curves, {
                type: "point-based",
                shape: createSignal([
                  [0.0, 0.0],
                  [1.0, 0.0]
                ])
              }];
            });
          }}
        >
          Add point-based
        </Button>
      </section>

      <section class="bg-def text-fg-2 pd-m0" style="overflow: scroll">
        <Canvas ref={curveCanvas} class={styles.canvasCard} />
        <Canvas ref={profileCanvas} class={styles.canvasCard} />
      </section>
    </Route>
  )
};

export default Main;
