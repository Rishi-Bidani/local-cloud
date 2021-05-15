<template>
  <div class="main-container">
    <sidebar-menu :width="width" :menu="menu" :collapsed="collapsed" />
    <div class="main-body">
      <img alt="Cloud logo" src="./assets/CloudStorageIcon.svg" id="icon" />
      <Home msg="Welcome to Your Vue.js App" />
    </div>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

export default {
  name: "App",
  components: {
    Home,
    SidebarMenu,
  },
  data() {
    return {
      width: "290px",
      widthCollapsed: "50px",
      collapsed: true,
      menu: [
        {
          header: "Cloud Options",
          hiddenOnCollapse: true,
        },
        {
          href: "/",
          title: "New Folder",
          icon: {
            element: "img",
            attributes: {
              src: "./assets/folder.svg",
              // alt: "new Folder",
            },
          },
        },
        {
          href: "/",
          title: "Upload",
          icon: "fa fa-chart-area",
          // child: [
          //   {
          //     href: "/charts/sublink",
          //     title: "Sub Link",
          //   },
          // ],
        },
        {
          header: "File Properties",
          hiddenOnCollapse: true,
        },
      ],
    };
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-color: bisque;
}
.main-container {
  margin-left: 50px;
  background-color: red;
}
.main-body {
  width: fit-content;
}
#icon {
  height: 2rem;
}
</style>
