<template>
  <sidebar-menu
    :width="width"
    :menu="menu"
    :collapsed="collapsed"
    :relative="true"
    :link-component-name="'custom-link'"
  />
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

const icons = {
  newFolder: require("../assets/newFolder.svg"),
  upload: require("../assets/upload.svg"),
  download: require("../assets/download.svg"),
  delete: require("../assets/delete.svg"),
};

export default {
  name: "SideBar",
  components: {
    SidebarMenu,
  },
  props: ["fileName", "fileSize", "disabled"],
  data() {
    return {
      width: "290px",
      widthCollapsed: "50px",
      collapsed: false,

      // relative: {
      //   type: Boolean,
      //   default: false,
      // },
      menu: [
        {
          header: "Cloud Options",
          hiddenOnCollapse: true,
        },
        {
          title: "New Folder",
          icon: {
            element: "img",
            attributes: {
              src: icons.newFolder,
              style: "background-color: transparent",
            },
          },
        },
        {
          title: "Upload",
          icon: {
            element: "img",
            attributes: {
              src: icons.upload,
              style: "background-color: transparent",
            },
          },
        },
        {
          header: "File Properties",
          hiddenOnCollapse: true,
        },
        {
          title: `File Name: ${this.fileName == undefined ? "Not Selected" : this.fileName}`,
        },
        {
          title: `File Size: ${this.fileSize == undefined ? 0 : this.fileSize}`,
        },
        {
          title: "Download",
          icon: {
            element: "img",
            attributes: {
              src: icons.download,
              style: "background-color: transparent",
            },
          },
          disabled: this.disabled,
        },
        {
          title: "Delete",
          icon: {
            element: "img",
            attributes: {
              src: icons.delete,
              style: "background-color: transparent",
            },
          },
          disabled: this.disabled,
        },
      ],
    };
  },
};
</script>
