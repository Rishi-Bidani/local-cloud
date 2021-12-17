<template>
    <div class="container flex">
        <SideBar
            :key="`key-${sideBarId}`"
            :fileName="sidebarFileName"
            :fileSize="sidebarFileSize"
            :disabled="sidebarDownloadDisabled"
            v-on:clicked-item="clickedItem"
        />
        <main class="container flex flex--column">
            <span class="title center">YOUR HOME CLOUD</span>
            <BreadCrumb
                :navigationPath="relativePath"
                v-on:navigation-link-clicked="updateNavigation"
            />
            <FilesAndFolders
                :files="files"
                :folders="folders"
                v-on:clicked-folder="navigateFolder"
                v-on:download-file="downloadFile"
                v-on:file-clicked="fileClicked"
                v-on:context-menu-invoked="ctxmenu"
            />

            <Modal v-if="showModal" @cancel="showModal = false" @ok="newFolder" />
            <div ref="dropzone" class="container">
                <Dropzone
                    :currentPath="relativePath.join('/')"
                    v-on:finishedUpload="finishedUpload"
                    ref="myDropzone"
                />
            </div>
            <ContextMenu
                :menu="options"
                :show="ctxshow"
                :x="ctxX"
                :y="ctxY"
                v-on:clickedItem="ctxClick"
                :key="`ctx-${contextMenuKey}`"
            />
        </main>
    </div>
</template>

<script>
import SideBar from "./components/sidebar.vue";
import FilesAndFolders from "./components/filesandfolders.vue";
import BreadCrumb from "@/components/breadcrumb.vue";
import Modal from "@/components/modal.vue";
import Dropzone from "@/components/dropzone";
import ContextMenu from "@/components/contextmenu.vue";

// JS
import Request from "./js/requests.js";

export default {
    name: "App",
    components: {
        BreadCrumb,
        SideBar,
        FilesAndFolders,
        Modal,
        Dropzone,
        ContextMenu,
    },
    data() {
        return {
            // Globally useful
            relativePath: ["."],

            // Sidebar stuff
            sidebarFileName: null,
            sidebarFileSize: null,
            sidebarDownloadDisabled: true,
            sideBarId: 0,

            // FilesAndFolder stuff
            files: [],
            folders: [],

            // Modal stuff
            showModal: false,

            // Contextmenu stuff
            options: ["Delete Folder", "Download Folder"],
            ctxX: 0,
            ctxY: 0,
            ctxshow: false,
            ctxMenuFolder: "",
            contextMenuKey: 0,
        };
    },
    async created() {
        const res = await Request.FilesAndFolders(".");
        this.files = res.data.files;
        this.folders = res.data.folders;
    },
    methods: {
        async getFilesAndFolders(forPath) {
            const res = await Request.FilesAndFolders(forPath);
            this.files = res.data.files;
            this.folders = res.data.folders;
            this.sidebarFileName = null;
            this.sidebarFileSize = null;
            this.sidebarDownloadDisabled = true;
        },
        navigateFolder(folderName) {
            this.relativePath.push(folderName);
            const relativePathString = this.relativePath.join("/");
            this.getFilesAndFolders(relativePathString);
        },
        async downloadFile(fileName) {
            const relativePathString = this.relativePath.join("/");
            await Request.downloadFile(relativePathString, fileName);
        },

        async updateNavigation(name, index) {
            if (this.relativePath[index] === name) this.relativePath.splice(index + 1);
            const relativePathString = this.relativePath.join("/");
            await this.getFilesAndFolders(relativePathString);
        },
        fileClicked(fileName, fileSize) {
            this.sidebarFileName = fileName;
            this.sidebarFileSize = fileSize;
            this.sidebarDownloadDisabled = false;
            console.log(this.sidebarFileName);
        },

        async newFolder(folderName) {
            const relativePathString = this.relativePath.join("/");
            await Request.createFolder(relativePathString, folderName);
            this.showModal = false;
            await this.getFilesAndFolders(relativePathString);
        },

        async clickedItem(item) {
            switch (item.title) {
                case "New Folder": {
                    this.showModal = true;
                    break;
                }
                case "Upload": {
                    let dz = this.$refs["dropzone"];
                    dz.scrollIntoView({ behavior: "smooth" });
                    break;
                }
                case "Download": {
                    const relativePathString = this.relativePath.join("/");
                    await Request.downloadFile(relativePathString, this.sidebarFileName);
                    break;
                }
                case "Delete": {
                    const relativePathString = this.relativePath.join("/");
                    const fileName = this.sidebarFileName;
                    await Request.deleteFile(relativePathString, fileName);
                    await this.getFilesAndFolders(relativePathString);
                    break;
                }
            }
        },
        finishedUpload() {
            this.getFilesAndFolders(this.relativePath.join("/"));
        },

        //    Context menu
        ctxmenu(folder, event) {
            this.ctxX = event.clientX;
            this.ctxY = event.clientY;
            this.ctxshow = true;
            this.ctxMenuFolder = folder;
            this.contextMenuKey++;
        },
        async ctxClick(item) {
            // item == context menu clicked item
            switch (item) {
                case "Delete Folder": {
                    if (
                        confirm(`Are you sure you want delete ${this.ctxMenuFolder}.
                        \nThis will delete all its contents!❗❗`)
                    ) {
                        // OK
                        await Request.deleteFolder(this.relativePath.join("/"), this.ctxMenuFolder);
                        await this.getFilesAndFolders(this.relativePath.join("/"));
                    } else {
                        // Cancel
                    }
                    break;
                }

                case "Download Folder": {
                    // console.log("download folder");
                    console.log();
                    await Request.downloadFolder(this.relativePath.join("/"), this.ctxMenuFolder);
                    break;
                }
            }
        },
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

:root {
    --bg-color: bisque;
    --color: #2c3e50;
    --figure-hover: cornsilk;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--bg-color);
    color: var(--color);
}

.flex {
    display: flex;
}

.flex--column {
    flex-flow: column;
}

.title {
    padding: 0.5rem;
    font-weight: 900;
    font-size: 1.2rem;
}

.center {
    text-align: center;
    margin: 0 auto;
}
</style>

<style scoped>
.container {
    width: 100%;
    height: 100vh;
}

main {
    overflow-y: scroll;
}

footer {
    display: flex;
    width: 100%;
}
</style>
