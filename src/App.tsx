import { Component, createSignal, ParentComponent } from "solid-js";
import Curves from "./components/Curves";
import ScatteringProfile from "./components/ScatteringProfile";
import MathCurves from "./components/mathematical/Curves";
import MathScatteringProfile from "./components/mathematical/ScatteringProfile";
import { lerp } from "./calculations";

const H2: ParentComponent = (props) => (
  <h2 class="font-bold text-m0 text-fg-1">{props.children}</h2>
);

const Section: ParentComponent = (props) => (
  <section class="flex flex-col items-center gap-m0">{props.children}</section>
);

const shapes = {
  test: [
    [0.0, 0.6],
    [0.2, 0.6],
    [0.4, 0.6],
    [0.6, 0.6],
    [0.8, 0.6],
    [1.0, 0.6],
  ],
  common: [
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
  ],
  desir: [
    [0.0, 0.3],
    [0.1, 0.8],
    [0.5, 0.83],
    [0.9, 0.8],
    [1.0, 0.7],
  ],
};

const mathShape = (x: number, i: number, h: number, a: number, b: number): number => {
  const c = Math.pow((2*Math.pow(x, i)) - 1, 2);
  const sigmoid = (x: number, k: number) => {
    return (x - k*x) / (k - 2*k*Math.abs(x) + 1)
  };
  const s = (1 + sigmoid(Math.pow(0.5, 1 / i)-x, -1)) / 2
  const d = lerp(b, a, s);
  return (1 - c * (1-d)) * h;
}

const shap = (x: number): number => {
  return mathShape(x, 1/2, 0.8, 0.8, 0.8);
}

const Main: Component = () => {
  const [shape, setShape] = createSignal(shapes.desir);

  return (
    <div class="flex items-center flex-col gap-m0">
      <Section>
        <H2>Curve based</H2>
        <div class="gap-s-- flex flex-wrap justify-center">
          <div class="card">
            Curves
            <Curves shapeSignal={[shape, setShape]} />
            <div class="flex flex-col gap-s-- text-fg-2">
              <p class="">
                Left click next to a point to move it
              </p>
              <p class="">
                Right click next to a point to delete it
              </p>
              <p class="">
                Left click away from points to create new
              </p>
            </div>
          </div>
          <div class="card">
            Scattering profile
            <ScatteringProfile shape={shape()} />
          </div>
        </div>
      </Section>

      <Section>
        <H2>Mathematically described</H2>
        <div class="gap-s-- flex flex-wrap justify-center">
          <div class="card">
            Curves
            <MathCurves shape={shap} resolution={32} />
          </div>
          <div class="card">
            Scattering profile
            <MathScatteringProfile shape={shap} resolution={8} />
          </div>
        </div>
      </Section>
    </div>
  )
};

export default Main;
