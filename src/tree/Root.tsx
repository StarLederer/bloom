import { Component } from "solid-js";
import router from "~/ui/router";
import Button from "~/ui/primitives/Button";
import Mathematical from "./mathematical";
import CurveBased from "./curveBased";

const Main: Component = () => {
  router.navigate("/mathematical")

  return (
    <main class="relative height-full" style="overflow: hidden">
      <Mathematical path="/mathematical" />
      <CurveBased path="/curve-based" />
    </main>
  )
};

export default Main;
