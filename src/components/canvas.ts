import { theme } from "../../unocss-preset";
import { remToPx } from "../util";

const component = (target: HTMLCanvasElement) => {
  target.width = remToPx(Number(theme.wrapp.sizes['l--'].slice(0, -3)));
  target.height = remToPx(Number(theme.wrapp.sizes['l--'].slice(0, -3)));
  return  target;
};

export default component;
