const lerp = (a: number, b: number, t: number) => (a + (b - a) * t);

const dot = (a: [number, number], b: [number, number]) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

const magnitude = (vec: [number, number]) =>
  Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);

const normalize = (vec: [number, number]) => {
  const mag = magnitude(vec);
  vec[0] /= mag;
  vec[1] /= mag;
  return vec;
}

const getPrecomputedShape = (shape: number[][]) => {
  let pos = 0;
  return shape.map((point) => {
    const o = [point[0] - pos, point[1]];
    pos += o[0];
    return o;
  })
};

const getRange = (shape: number[][], pos: number): [number[], number[], number] => {
  let offset = shape[0][0];

  for (let i = 0; i < shape.length - 1; ++i) {
    offset += shape[i + 1][0];
    if (pos < offset) {
      return [shape[i], shape[i + 1], offset];
    }
  }

  return [shape[shape.length - 2], shape[shape.length - 1], offset];
};

const getPoint = (shape: number[][], pos: number) => {
  let [p0, p1, offset] = getRange(shape, pos);
  let start = offset - p1[0];
  // let end = offset;
  let t = (pos - start) / p1[0];
  // t = 0.5-Math.cos(t*Math.PI)*0.5
  return lerp(p0[1], p1[1], t);
};

const getValues = (
  shape: (x: number) => number,
  numMips: number
) => {
  /**
   * Generates light distribution array for a given mip within numMips
   *
   * @param mip mip index (>= 0; < numMips)
   * @returns array of values representing light contribution to each mip
   */
  const getLayer = (mip: number) => [
    ...Array(mip + 1).fill(1 / (mip + 1)),
    ...Array(numMips - mip - 1).fill(0),
  ];

  const mips: number[][] = [];
  for (let mipI = 0; mipI < numMips; ++mipI) {
    mips[mipI] = getLayer(mipI);
  }

  // Iterate between last mip and mip 1
  for (let mipI = numMips - 1; mipI >= 1; --mipI) {
    const current = mips[mipI];
    const next = mips[mipI - 1];

    const mipX = (mipI - 1) / (numMips - 2);
    const mipBlend = shape(mipX);

    // Update next mip
    mips[mipI - 1] = next.map((_, i) => (
      lerp(next[i], current[i], mipBlend)
    ));
  }

  return mips[0];
};

export {
  lerp,
  dot,
  magnitude,
  normalize,
  getPrecomputedShape,
  getRange,
  getPoint,
  getValues,
};
