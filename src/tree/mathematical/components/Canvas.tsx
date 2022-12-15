import { Component, createSignal, JSXElement } from "solid-js";

type IProps = {
  getChildren: (width: number, height: number) => JSXElement;
  class?: string;
};

const Main: Component<IProps> = (props) => {
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
