import { theme } from "~/../unocss-preset";
import { getColor } from "~/../unocss-preset/external";

const indexToHue = (i: number) => (
  45 + + 15 * (1 - (i % 3))
);

const getCurveColor = (i: number) => (
  getColor(indexToHue(i), theme.wrapp.colors.interactive['int'].base)
);

export {
  indexToHue,
  getCurveColor
}
