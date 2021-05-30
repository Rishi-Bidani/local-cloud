import { createApp, h } from "vue";
import App from "./App.vue";

import VueSidebarMenu from "vue-sidebar-menu";
// import VModal from "vue-js-modal";

const app = createApp(App);
app.use(VueSidebarMenu);
const customLink = {
  name: "CustomLink",
  props: ["item"],
  render() {
    return h("a", this.$slots.default());
  },
};
app.component("custom-link", customLink);
// app.use(VModal, {
//   componentName: "Modal",
//   dynamicDefault: { draggable: true, resizable: true },
// });
app.mount("#app");
