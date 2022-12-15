import { Component, createSignal, JSXElement } from "solid-js";

type IProps = {
  getChildren: (width: number, height: number) => JSXElement;
  class?: string;
};

const Main: Component<IProps> = (props) => {
  const [i, setI] = createSignal(0.6);
  const [h, setH] = createSignal(0.9);
  const [a, setA] = createSignal(0.8);
  const [b, setB] = createSignal(0.8);

  const [width, setWidth] = createSignal(0);
  // const [height, setHeight] = createSignal(0);

  let wrapper: HTMLDivElement | undefined = undefined;

  const updateSize = () => {
    setWidth(wrapper?.offsetWidth ?? 0);
  };

  window.addEventListener("resize", updateSize);

  return (
    <div ref={wrapper} class={props.class}>
      {props.getChildren(width(), width())}
    </div>
  )
};

export default Main;
