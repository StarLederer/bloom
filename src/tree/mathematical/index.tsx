import { Component, createEffect, createSignal, onMount } from "solid-js";
import { Route } from "~/ui/router";
import Slider from "~/ui/primitives/Slider";
import Canvas from "./components/Canvas";
import Curves from "./components/Curves";
import ScatteringProfile from "./components/ScatteringProfile";
import { lerp } from "~/calculations";
import styles from "./style.module.css";

const mathShape = (x: number, i: number, h: number, a: number, b: number): number => {
  const c = Math.pow((2 * Math.pow(x, i)) - 1, 2);
  const sigmoid = (x: number, k: number) => {
    return (x - k * x) / (k - 2 * k * Math.abs(x) + 1)
  };
  const s = (1 + sigmoid(Math.pow(0.5, 1 / i) - x, -1)) / 2
  const d = lerp(b, a, s);
  return (1 - c * (1 - d)) * h;
}

type IProps = {
  path: string;
};

const Main: Component<IProps> = (props) => {
  const [i, setI] = createSignal(0.5);
  const [h, setH] = createSignal(0.9);
  const [a, setA] = createSignal(0.3);
  const [b, setB] = createSignal(0.8);

  const shape = () => {
    // We return a function
    return (x: number): number => {
      // The function that we return accepts x and returns y
      return mathShape(x, i(), h(), a(), b()); // we use mathShape to calculate y
    }
  }

  return (
    <Route path={props.path} class={styles.grid}>
      <div class={styles.panel}>
        <label class={styles.label}>
          <span>
            Bump angle&nbsp;
            <span class="text-fg-3">{Math.round(i() * 45)}deg</span>
          </span>
          <Slider step={0.01} signal={[i, setI]} />
          <span></span>
        </label>

        <label class={styles.label}>
          <span>
            Top intensity&nbsp;
            <span class="text-fg-3">{h()}</span>
          </span>
          <Slider step={0.01} signal={[h, setH]} />
        </label>

        <label class={styles.label}>
          <span>
            Near contribution&nbsp;
            <span class="text-fg-3">{a()}</span>
          </span>
          <Slider step={0.01} signal={[a, setA]} />
        </label>

        <label class={styles.label}>
          <span>
            Far contribution&nbsp;
            <span class="text-fg-3">{b()}</span>
          </span>
          <Slider step={0.01} signal={[b, setB]} />
        </label>
      </div>

      <div class={styles.grid2}>
        <div class={styles.card}>
          <span>Curve</span>
          <Canvas getChildren={(w, h) => (
            <Curves width={w} height={h} shape={shape()} resolution={32} />
          )} />
        </div>

        <div class={styles.card}>
          <span>Scattering profile</span>
          <Canvas getChildren={(w, h) => (
            <ScatteringProfile width={w} height={h} shape={shape()} resolution={8} />
          )} />
        </div>
      </div>
    </Route>
  )
};

export default Main;
