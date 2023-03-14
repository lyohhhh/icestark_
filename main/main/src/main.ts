import { createApp } from "vue";
import "./style.css";
import genRoute from "./router";
import App from "./App.vue";

createApp(App).use(genRoute()).mount("#app");
