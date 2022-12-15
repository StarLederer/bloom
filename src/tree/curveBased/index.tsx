import { Component, createSignal, ParentComponent } from "solid-js";
import { Route } from "~/ui/router";

type IProps = {
  path: string;
};

const Main: Component<IProps> = (props) => {
  return (
    <Route path={props.path}>
      <div class="flex items-center flex-col gap-m0">
        Coming soon...
      </div>
    </Route>
  )
};

export default Main;
