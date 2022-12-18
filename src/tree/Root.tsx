import { Component } from "solid-js";
import router from "~/ui/router";
import Button from "~/ui/primitives/Button";
import Mathematical from "./mathematical";
import CurveBased from "./curveBased";
import Visualizer from "./visualizer";

const Main: Component = () => {
  router.navigate("/visualizer")

  return (
    <main class="relative height-full" style="overflow: hidden">
      <Visualizer path="/visualizer" />
    </main>
  )
};

export default Main;
