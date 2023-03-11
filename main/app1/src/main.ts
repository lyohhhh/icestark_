import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import isInIcestark from "@ice/stark-app/lib/isInIcestark";
import type { App as Root } from "vue";
import genRoute from "./router";

let vue: Root<Element> | null = null;

if (!isInIcestark()) {
  vue = createApp(App);
  vue.use(genRoute()).mount("#app");
}

export function unmount() {
  if (vue) {
    vue.unmount();
  }
}

export function mount({ container }: { container: Element }) {
  unmount();
  vue = createApp(App);
  vue.use(genRoute()).mount(container);
}
