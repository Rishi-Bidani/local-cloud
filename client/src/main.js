import { createApp, h } from "vue";
import App from "./App.vue";
import VueSidebarMenu from "vue-sidebar-menu";

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
app.mount("#app");
