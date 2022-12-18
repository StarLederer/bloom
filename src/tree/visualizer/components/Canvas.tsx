import { Component, createEffect, createSignal } from "solid-js";

type IProps = {
  class?: string;
  render: (ctx: CanvasRenderingContext2D) => void;
  eventListeners?: Record<string, (ev: any) => void>;
};

const Main: Component<IProps> = (props) => {
  const [width, setWidth] = createSignal(0);
  // const [height, setHeight] = createSignal(0);

  let wrapper: HTMLDivElement | undefined = undefined;
  let cnv: HTMLCanvasElement | undefined;

  const updateSize = () => {
    setWidth(wrapper?.offsetWidth ?? 0);
  };

  // This is leteral ass but my router prevents me from being able to use onMount to guarantee refs being initialized
  setTimeout(updateSize, 0);

  createEffect(() => {
    if (!cnv) return;

    cnv.width = width();
    cnv.height = width();

    const ctx = cnv.getContext("2d");
    if (!ctx) return;
    props.render(ctx);
  });

  createEffect(() => {
    const listeners = props.eventListeners ?? {};
    Object.keys(listeners).forEach((key) => {
      cnv?.addEventListener(key, listeners[key]);
    });
  });

  return (
    <div ref={wrapper} class={props.class}>
      <canvas ref={cnv}></canvas>
    </div>
  )
};

export default Main;
