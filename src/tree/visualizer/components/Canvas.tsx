import { Component, createSignal } from "solid-js";

type IProps = {
  ref?: HTMLCanvasElement;
  class?: string;
};

const Main: Component<IProps> = (props) => {
  const [width, setWidth] = createSignal(0);
  // const [height, setHeight] = createSignal(0);

  let wrapper: HTMLDivElement | undefined = undefined;

  const updateSize = () => {
    setWidth(wrapper?.offsetWidth ?? 0);
  };

  // This is leteral ass but my router prevents me from being able to use onMount to guarantee refs being initialized
  setInterval(updateSize, 1000);

  return (
    <div ref={wrapper} class={props.class}>
      <canvas width={width()} height={width()} ref={props.ref}></canvas>
    </div>
  )
};

export default Main;
