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
} from "./render functions/mathematical";
import { drawAxis, drawProfileGrid } from "./render functions/grids";
import {
  drawCurves as drawCurvesPB,
  drawProfile as drawProfilePB
} from "./render functions/pointBased";
import { getCurveColor, indexToHue } from "./colors";
import styles from "./style.module.css";

type IProps = {
  path: string;
};

const Configurator: ParentComponent<{
  curve: ICurve;
  onRemove: () => void;
  hue: number
}> = (props) => {
  return (
    <div class="flex flex-col gap-s++ bg-srf pd-m0 round-m0 text-fg-1" style={`--hue: ${props.hue}`}>
      <h3 class="text-fg-0 font-bold">{props.curve.type}</h3>
      {props.curve.comment && (
        <p class="text-fg-2 max-width-l0">{props.curve.comment}.</p>
      )}
      {props.children}
      <div class="relative flex gap-s-">
        <Button onClick={props.onRemove} hue={0} class="flex-1 round-m0 pd-m0">
          <div class="i-mdi-remove" />
        </Button>
        <Button
          onClick={() => {
            props.curve.visible[1]((prev) => !prev);
          }}
          class="flex-1 round-m0 pd-m0"
        >
          <div class="absolute transition i-mdi-eye" style={`opacity: ${props.curve.visible[0]() ? 1 : 0}`} />
          <div class="absolute transition i-mdi-eye-off" style={`opacity: ${props.curve.visible[0]() ? 0 : 1}`} />
        </Button>
      </div>
    </div>
  );
};

type IMathematicalCurve = {
  type: "mathematical";
  i: Signal<number>;
  bI: Signal<number>;
  bC: Signal<number>;
  hF: Signal<number>;
}

type IPointCurve = {
  type: "point-based";
  shape: Signal<number[][]>;
}

type ICurve = (IMathematicalCurve | IPointCurve) & {
  visible: Signal<boolean>
  comment?: string,
};

const Main: Component<IProps> = (props) => {
  const [curves, setCurves] = createSignal<ICurve[]>([
    {
      type: "point-based",
      comment: "Typycal blend curve in Unity",
      visible: createSignal(true),
      shape: createSignal([
        [0.0, 0.3],
        [0.1, 0.8],
        [1.0, 0.8],
      ]),
    },
    {
      type: "mathematical",
      comment: "Our method replicating the curve above",
      visible: createSignal(true),
      i: createSignal(0.3),
      bI: createSignal(0.71),
      bC: createSignal(0.95),
      hF: createSignal(1),
    },
    {
      type: "point-based",
      comment: "Screen blur",
      visible: createSignal(false),
      shape: createSignal([
        [0.0, 1.0],
        [0.5, 1.0],
        [0.5, 0.0],
        [1.0, 0.0],
      ]),
    },
    {
      type: "mathematical",
      comment: "Our method creating screen blur",
      visible: createSignal(false),
      i: createSignal(1),
      bI: createSignal(0),
      bC: createSignal(0),
      hF: createSignal(0.33),
    },
  ]);

  const renderCurves = () => (ctx: CanvasRenderingContext2D) => {
    // Clear pass
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Grid pass
    drawAxis(ctx);

    // Curves pass
    curves().forEach((curve, i) => {
      if (!curve.visible[0]()) return;

      switch (curve.type) {
        case "mathematical":
          drawCurvesMath(
            ctx,
            (x: number): number => {
              return mathShape(x, curve.i[0](), curve.bI[0](), curve.bC[0](), curve.hF[0]());
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
  };

  const renderProfiles = () => (ctx: CanvasRenderingContext2D) => {
    // Clear pass
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Grid pass
    drawProfileGrid(ctx, 8);

    // Curves pass
    curves().forEach((curve, i) => {
      if (!curve.visible[0]()) return;

      switch (curve.type) {
        case "mathematical":
          drawProfileMath(
            ctx,
            (x: number): number => {
              return mathShape(x, curve.i[0](), curve.bI[0](), curve.bC[0](), curve.hF[0]());
            },
            8,
            getCurveColor(i)
          );
          break;
        case "point-based":
          drawProfilePB(ctx, curve.shape[0](), getCurveColor(i));
          break;
      }
    });
  };

  return (
    <Route path={props.path} class="height-full flex items-stretch justify-center">
      <section class="flex flex-col items-stretch pd-m0 gap-s" style="overflow: scroll">
        {curves().map((curve, i) => (
          <Configurator
            hue={indexToHue(i)}
            curve={curve}
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
                    h={curve.bI}
                    a={curve.bC}
                    b={curve.hF}
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
                visible: createSignal(true),
                i: createSignal(0.5),
                bI: createSignal(0.9),
                bC: createSignal(0.3),
                hF: createSignal(0.8),
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
                visible: createSignal(true),
                shape: createSignal([
                  [0.0, 0.5],
                  [1.0, 0.5]
                ])
              }];
            });
          }}
        >
          Add point-based
        </Button>
      </section>

      <section class="bg-def text-fg-2 pd-m0" style="overflow: scroll">
        <Canvas class={styles.canvasCard} render={renderCurves()} />
        <Canvas class={styles.canvasCard} render={renderProfiles()} />
      </section>
    </Route>
  )
};

export default Main;
