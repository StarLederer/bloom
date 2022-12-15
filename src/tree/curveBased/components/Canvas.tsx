import { Component } from "solid-js";
import { theme } from "../../unocss-preset";
import { remToPx } from "../util";

type IProps = {
  ref?: HTMLCanvasElement;
};

const Main: Component<IProps> = (props) => {
  const width = remToPx(Number(theme.wrapp.sizes['l--'].slice(0, -3)));
  const height = remToPx(Number(theme.wrapp.sizes['l--'].slice(0, -3)));

  return (
    <canvas width={width} height={height} ref={props.ref}></canvas>
  )
};

export default Main;
