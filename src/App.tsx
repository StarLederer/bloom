import { Component, createSignal } from "solid-js";
import Curves from "./components/Curves";
import ScatteringProfile from "./components/ScatteringProfile";

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

const Main: Component = () => {
  const [shape, setShape] = createSignal(shapes.desir);

  return (
    <div class="flex items-center flex-col gap-m--">
      {/* <h2 class="font-bold text-m-- text-fg-1">Curve based</h2> */}
      <div class="gap-s-- flex flex-wrap justify-center">
        <div class="card">
          Curves
          <Curves shapeSignal={[shape, setShape]}/>
          <div class="flex flex-col gap-s-- text-fg-2">
            <p class="">
              Left click next to a point to move it
            </p>
            <p class="">
              Right click next to a point to delete it
            </p>
            <p class="">
              Left click away from points to create new
            </p>
          </div>
        </div>
        <div class="card">
          Scattering profile
          <ScatteringProfile shape={shape()} />
        </div>
      </div>
    </div>
  )
};

export default Main;
