const remToPx = (rem) => (
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
);

const remStringToPx = (rem) => (
  Number(rem.slice(0, -3)) * parseFloat(getComputedStyle(document.documentElement).fontSize)
);

export { remToPx, remStringToPx };
