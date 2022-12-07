const lerp = (a, b, t) => (a + (b - a) * t);

const getPrecomputedShape = (shape) => {
  let pos = 0;
  return shape.map((point) => {
    const o = [point[0] - pos, point[1]];
    pos += o[0];
    return o;
  })
};

const getRange = (shape, pos) => {
  let offset = shape[0][0];

  for (let i = 0; i < shape.length - 1; ++i) {
    offset += shape[i + 1][0];
    if (pos < offset) {
      return [shape[i], shape[i + 1], offset];
    }
  }

  return [shape[shape.length - 2], shape[shape.length - 1], offset];
};

const getPoint = (shape, pos) => {
  let [p0, p1, offset] = getRange(shape, pos);
  let start = offset - p1[0];
  let end = offset;
  let t = (pos - start) / p1[0];
  // t = 0.5-Math.cos(t*Math.PI)*0.5
  return lerp(p0[1], p1[1], t);
};

const getValues = (shapeP, numPoints) => {
  const values = Array(numPoints).fill(1);
  for (let i = values.length - 1; i >= 1; --i) {
    let pointValue = getPoint(shapeP, (i-1) / (values.length-1));
    for (let j = i; j < values.length; ++j) {
      values[j] *= pointValue;
    }
    values[i - 1] *= 1 - pointValue;
  }
  return values;
};

export {
  lerp,
  getPrecomputedShape,
  getRange,
  getPoint,
  getValues,
};
