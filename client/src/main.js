import { createApp } from "vue";
import App from "./App.vue";
import VueSidebarMenu from "vue-sidebar-menu";
// import VModal from "vue-js-modal";

const app = createApp(App);

app.use(VueSidebarMenu);
// app.use(VModal, {
//   componentName: "Modal",
//   dynamicDefault: { draggable: true, resizable: true },
// });
app.mount("#app");
