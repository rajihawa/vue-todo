import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import "es6-promise/auto";
import store, { key } from "./store";

const app = createApp(App);

// pass the injection key
app.use(store, key);

app.mount("#app");
