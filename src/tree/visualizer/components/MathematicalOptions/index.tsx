import { Component, Signal } from "solid-js";
import Slider from "~/ui/primitives/Slider";
import styles from "./style.module.css";

const Main: Component<{
  i: Signal<number>;
  h: Signal<number>;
  a: Signal<number>;
  b: Signal<number>;
}> = (props) => {
  return (
    <div class="flex flex-col gap-s+">
      <label class={styles.label}>
        <span>
          Intensity&nbsp;
          <span class="text-fg-3">{Math.round(props.i[0]() * 45)}deg ({props.i[0]()})</span>
        </span>
        <Slider step={0.01} signal={props.i} />
      </label>

      <label class={styles.label}>
        <span>
          LF boost&nbsp;
          <span class="text-fg-3">{props.h[0]()}</span>
        </span>
        <Slider step={0.01} signal={props.h} />
      </label>

      <label class={styles.label}>
        <span>
          LF boost curv.&nbsp;
          <span class="text-fg-3">{props.a[0]()}</span>
        </span>
        <Slider step={0.01} signal={props.a} />
      </label>

      <label class={styles.label}>
        <span>
          High-pass freq.&nbsp;
          <span class="text-fg-3">{props.b[0]()}</span>
        </span>
        <Slider step={0.01} signal={props.b} />
      </label>
    </div>
  )
};

export default Main;
