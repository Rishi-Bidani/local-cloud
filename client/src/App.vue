<template>
  <div class="main-container">
    <sidebar-menu
      :width="width"
      :menu="menu"
      :collapsed="collapsed"
      :relative="relative"
      @item-click="onItemClick"
    />
    <div class="main-body">
      <div class="body-vertical">
        <!--  -->
        <div class="horizontal">
          <!-- <img alt="Cloud logo" src="./assets/CloudStorageIcon.svg" id="icon" /> -->
          <span class="title center" id="main-title">YOUR HOME CLOUD</span>
        </div>
        <div class="navpane">
          <div class="nav-container">
            <span class="navlinks" v-on:click="navlinknav(0)">uploads</span>
            <span
              class="navlinks"
              v-for="(nav, navInd) in navpath.split('/')"
              :key="`nav-${navInd}`"
              v-on:click="navlinknav(navInd)"
            >
              <span> {{ nav }} > </span>
            </span>
          </div>
        </div>
        <div class="folders">
          <Home
            msg="Welcome"
            :key="`Home-${HomeKey}`"
            v-on:folderPath="navigation"
            :getPropDirPath="navpath"
          />
          <Modal v-show="isModalVisible" @close="closeModal" v-on:submitFolderName="submitFolder" />
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
import Modal from "./components/Modal.vue";
import FileHandling from "./fileHandling";

const icons = {
  newFolder: require("./assets/newFolder.svg"),
  upload: require("./assets/upload.svg"),
};

export default {
  name: "App",
  components: {
    Home,
    SidebarMenu,
    Modal,
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
          // href: "/",
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
      isModalVisible: false,
      folderName: "",
      HomeKey: 0,
      navpath: "",
    };
  },
  methods: {
    onItemClick(event, item) {
      event.preventDefault();
      if (item.title == "New Folder") {
        console.log(item.title);
        this.showModal();
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    submitFolder(fName) {
      FileHandling.newFolder(fName, ".");
      this.HomeKey++; //To refresh Home Component
    },
    navigation(dirpath) {
      this.navpath = dirpath;
      this.HomeKey++;
    },
    navlinknav(navid) {
      console.log(navid);
      this.navpath = this.navpath
        .split("/")
        .slice(0, navid + 1)
        .join("/");
      this.HomeKey++;
    },
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
  text-align: left;
}
.navlinks {
  font-weight: bold;
  cursor: pointer;
}
.navlinks:hover {
  color: blueviolet;
}
.nav-container {
  padding: 0.5rem;
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
