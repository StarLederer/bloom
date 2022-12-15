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

  // This is leteral ass but my router prevents me from being able to use onMount to guarantee refs being initialized
  setTimeout(updateSize, 1000);

  return (
    <div ref={wrapper} class={props.class}>
      {props.getChildren(width(), width())}
    </div>
  )
};

export default Main;
