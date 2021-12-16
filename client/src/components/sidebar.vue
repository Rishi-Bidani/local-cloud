<template>
    <sidebar-menu
        :width="width"
        :menu="menu"
        :collapsed="collapsed"
        :relative="true"
        :link-component-name="'custom-link'"
        @item-click="clicked"
    />
</template>

<script>
import {SidebarMenu} from "vue-sidebar-menu";
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
    watch: {
        fileName: function () {
            const item = this.menu.filter(items => items.id === "FileName")[0];
            const itemSize = this.menu.filter(items => items.id === "FileSize")[0];
            const filesize = this.fileSize === null ? "Not Selected" :
                this.fileSize > 1000 ? (this.fileSize / 1000).toFixed(2) + "mb" :
                    this.fileSize + "kb";
            itemSize.title = `File Size: ${filesize}`
            item.title = `File Name: ${this.fileName === null ? "Not Selected" : this.fileName}`;
            item.attributes.title = `${this.fileName === null ? "Not Selected" : this.fileName}`;
        },
        disabled: function () {
            const items = this.menu.filter(items => items.id === "Download" || items.id === "Delete");
            items.forEach(item => item.disabled = this.disabled);
        }
    },
    methods: {
        clicked(event, item) {
            event.preventDefault();
            this.$emit("clicked-item", item)
        }
    },
    data() {
        return {
            width: "290px",
            widthCollapsed: "50px",
            collapsed: false,
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
                    id: "FileName",
                    title: `File Name: ${this.fileName === null ? "Not Selected" : this.fileName}`,
                    attributes: {
                        title: `${this.fileName === null ? "Not Selected" : this.fileName}`
                    }
                },
                {
                    id: "FileSize",
                    title: `File Size: ${this.fileSize === null ? 0 : this.fileSize}`,
                },
                {
                    id: "Download",
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
                    id: "Delete",
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

<style scoped>

</style>