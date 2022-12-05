import 'uno.css';
import canvas from "./components/canvas";
import profile from "./components/scatteringProfile";
import curves from "./components/curves";

const shapes = {
  test: [
    [0.0, 0.6],
    [0.2, 0.6],
    [0.4, 0.6],
    [0.6, 0.6],
    [0.8, 0.6],
    [1.0, 0.6],
  ],
  common: [
    [0.0, 0.3],
    [0.1, 0.8],
    [0.2, 0.8],
    [0.3, 0.8],
    [0.4, 0.8],
    [0.5, 0.8],
    [0.6, 0.8],
    [0.7, 0.8],
    [0.8, 0.8],
    [0.9, 0.8],
    [1.0, 0.8],
  ],
  desir: [
    [0.0, 0.3],
    [0.1, 0.8],
    [0.5, 0.83],
    [0.9, 0.8],
    [1.0, 0.7],
  ],
};

const c = document.getElementById("curves-canvas") as HTMLCanvasElement;
const c2 = document.getElementById("scattering-profile-canvas") as HTMLCanvasElement;

const updateShape = (newShape: number[][]) => {
  curves(c, newShape);
  profile(c2, newShape);
};

curves(canvas(c), shapes.desir);
profile(canvas(c2), shapes.desir);

let currentShape: number[][] = shapes.desir;

c.addEventListener("contextmenu", (ev) => {
  ev.preventDefault();
});
c.addEventListener("mousedown", (ev) => {
  ev.cancelBubble = true;
  ev.stopPropagation();
  ev.preventDefault();

  var rect = (ev.target as HTMLElement).getBoundingClientRect();
  var x = ev.clientX - rect.left;
  var y = ev.clientY - rect.top;

  const newPoint = [
    x / c.width,
    y / c.height,
  ];

  let crate = true;
  currentShape.forEach((point, i) => {
    if (Math.sqrt(Math.pow(point[0] - newPoint[0], 2) + Math.pow(point[1] - newPoint[1], 2)) < 0.1) {
      switch (ev.button) {
        case 0:
          if (i === 0) {
            newPoint[0] = 0;
          } else if (i === currentShape.length - 1) {
            newPoint[0] = 1;
          }
          currentShape[i] = newPoint;
          break;
        case 2:
          if (i > 0 && i < currentShape.length - 1) {
            currentShape.splice(i, 1);
          }
          break;
      }

      crate = false;
    }

  });

  if (crate && ev.button === 0) {
    currentShape = [...currentShape, newPoint].sort((a, b) => (a[0] - b[0]));
  }

  updateShape(currentShape);
});
