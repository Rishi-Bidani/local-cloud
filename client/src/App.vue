// Copyright 2020-2021 Rishi-Bidani
<template>
  <div class="main-container">
    <!-- <sidebar-menu
      :width="width"
      :menu="menu"
      :collapsed="collapsed"
      :relative="relative"
      @item-click="onItemClick"
      :key="`SideBar-${sbid}`"
    /> -->
    <SideBar
      :fileName="fileName"
      :fileSize="fileSize"
      :disabled="discheck"
      @item-click="onItemClick"
      :key="`sidebar-${sbid}`"
    />
    <div class="main-body">
      <div class="body-vertical">
        <!--  -->
        <div class="horizontal">
          <span class="title center" id="main-title">YOUR HOME CLOUD</span>
        </div>
        <!-- <span>Tip: If you can't see the scroll bar hold down shift and scroll</span> -->
        <div class="navpane">
          <div class="nav-container">
            <span class="navlinks" v-on:click="navlinknav(0)">uploads</span>
            <div
              class="navlinks"
              v-for="(nav, navInd) in navpath.split('/')"
              :key="`nav-${navInd}`"
              v-on:click="navlinknav(navInd)"
            >
              <span> &nbsp;{{ nav + " > " }} </span>
            </div>
          </div>
        </div>
        <div class="folders">
          <Home
            msg="Welcome"
            :key="`Home-${HomeKey}`"
            v-on:folderPath="navigation"
            :getPropDirPath="navpath"
            v-on:fileDetails="displayDetails"
            v-on:FolderDeleted="updateHome"
          />
        </div>
        <Modal v-show="isModalVisible" @close="closeModal" v-on:submitFolderName="submitFolder" />

        <!--  -->
        <div ref="dropzone">
          <DropZone :currentPath="navpath" v-on:finishedUpload="updateHome" ref="myDropzone" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import Modal from "./components/Modal.vue";
import DropZone from "./components/Dropzone.vue";
import FileHandling from "./fileHandling";
import SideBar from "./components/sidebar.vue";

export default {
  name: "App",
  components: {
    Home,
    Modal,
    DropZone,
    SideBar,
  },
  data() {
    return {
      isModalVisible: false,
      HomeKey: 0,
      dzid: 0,
      sbid: 0,
      navpath: "",
      fileSize: 0,
      fileName: "",
      downloadbuttondata: {},
      deleteButtonData: {},
      discheck: true, // Check if disabled - for delete and download
      dzkey: 0,
    };
  },
  mounted() {
    console.log("%cWARNING !!", "color:red; font-size: 25px");
    console.log("%cDO NOT TYPE ANYTHING HERE !!", "color:blue; font-size: 25px");
  },
  methods: {
    onItemClick(event, item) {
      event.preventDefault();
      if (item.title == "New Folder") {
        // console.log(item.title);
        this.showModal();
      } else if (item.title == "Upload") {
        // console.log(item.title);
        let dz = this.$refs["dropzone"];
        dz.scrollIntoView({ behavior: "smooth" });
      } else if (item.title == "Download" && !this.discheck) {
        FileHandling.SendForDownload(this.downloadbuttondata.gpdp, this.downloadbuttondata.fname);
      } else if (item.title == "Delete" && !this.discheck) {
        FileHandling.SendForDelete(this.deleteButtonData.gpdp, this.deleteButtonData.fname);
        this.HomeKey++;
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    submitFolder(fName) {
      FileHandling.newFolder(fName, this.navpath);
      this.HomeKey++; // To refresh Home Component
      this.dzid++; // Dropzone refresh
    },
    navigation(dirpath) {
      this.navpath = dirpath;
      this.HomeKey++;
      this.dzid++;
    },
    navlinknav(navid) {
      // console.log(navid);
      this.navpath = this.navpath
        .split("/")
        .slice(0, navid + 1)
        .join("/");
      this.HomeKey++;
      this.dzid++;
    },
    displayDetails(file, pathAndName) {
      // Getting file name
      // Getting file size and adjusting for mb
      // Checking if download button is active or not
      // sidebar refresh
      this.fileSize = file.size >= 1000 ? (file.size / 1024).toFixed(3) + " mb" : file.size + " kb";
      this.fileName = file.name;
      this.discheck = false;
      this.sbid++;
      this.downloadbuttondata = pathAndName;
      this.deleteButtonData = pathAndName;
    },
    updateHome() {
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
}
.title {
  font-weight: 900;
  padding: 0.5rem;
  font-size: 2rem;
}
.title2 {
  font-weight: 600;
  font-size: 1.5rem;
  text-align: left;
}
.center {
  text-align: center;
  justify-content: center;
}
.navpane {
  width: 90%;
  height: 2.5rem;
  background-color: floralwhite;
  align-self: center;
  border-radius: 1rem;
  margin-top: 2rem;
  text-align: left;
  overflow-x: scroll;
  overflow-y: hidden;
  /* -ms-overflow-style: none;*/ /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.navpane::-webkit-scrollbar {
  height: 5px;
  color: seagreen;
}
.navpane::-webkit-scrollbar-thumb {
  border-radius: 2.5px;
  background: seagreen;
}
.navlinks {
  font-weight: bold;
  cursor: pointer;
  display: inline-block;
  vertical-align: sub;
}
.navlinks:hover {
  color: blueviolet;
}
.nav-container {
  padding: 0.3rem;
  margin: auto;
  white-space: nowrap;
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
