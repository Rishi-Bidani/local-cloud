<template>
  <div class="main-container">
    <sidebar-menu :width="width" :menu="menu" :collapsed="collapsed" :relative="relative" />
    <div class="main-body">
      <div class="body-vertical">
        <!--  -->
        <div class="horizontal">
          <!-- <img alt="Cloud logo" src="./assets/CloudStorageIcon.svg" id="icon" /> -->
          <span class="title center" id="main-title">YOUR HOME CLOUD</span>
        </div>
        <div class="navpane"></div>
        <div class="folders">
          <Home msg="Welcome to Your Vue.js App" />
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
const icons = {
  newFolder: require("./assets/newFolder.svg"),
  upload: require("./assets/upload.svg"),
};

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
      collapsed: false,
      relative: {
        type: Boolean,
        default: false,
      },
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
              src: icons.newFolder,
              // alt: "new Folder",
            },
          },
        },
        {
          href: "/",
          title: "Upload",
          icon: {
            element: "img",
            attributes: {
              src: icons.upload,
            },
          },
          // chil0d: [
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
  /* overflow-y: scroll; */
}
.main-container {
  background-color: bisque;
  height: 100vh;
  display: flex;
  flex-direction: row;
}
.main-body {
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
}
.body-vertical {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.folders {
  align-self: flex-start;
  margin-top: 2rem;
  width: 100%;
}
.horizontal {
  display: inline-block;
  width: 100%;
  /* flex-direction: row; */
}
.title {
  font-weight: 900;
  /* align-self: flex-end; */
  padding: 0.5rem;
  font-size: 2rem;
}
.title2 {
  font-weight: 600;
  /* padding: 0.5rem; */
  font-size: 1.5rem;
  text-align: left;
}
.center {
  text-align: center;
  justify-content: center;
}
.navpane {
  width: 90%;
  height: 2rem;
  background-color: floralwhite;
  align-self: center;
  border-radius: 1rem;
  margin-top: 2rem;
}
#main-title {
  height: 100%;
}
#icon {
  height: 4rem;
  float: left;
  padding: 0.5rem;
}
</style>
