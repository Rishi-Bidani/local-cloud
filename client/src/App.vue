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
            />
            <Modal v-if="showModal" @cancel="showModal=false" @ok="newFolder"/>
        </main>
    </div>
</template>

<script>
import SideBar from './components/sidebar.vue'
import FilesAndFolders from "./components/filesandfolders.vue"
import BreadCrumb from "@/components/breadcrumb.vue";
import Modal from "@/components/modal.vue"

// JS
import Request from "./js/requests.js"

export default {
    name: 'App',
    components: {
        BreadCrumb,
        SideBar,
        FilesAndFolders,
        Modal
    },
    data() {
        return {
            sidebarFileName: null,
            sidebarFileSize: null,
            sidebarDownloadDisabled: true,
            sideBarId: 0,
            files: [],
            folders: [],
            relativePath: ["."],
            showModal: false
        }
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
        },
        navigateFolder(folderName) {
            this.relativePath.push(folderName);
            const relativePathString = this.relativePath.join("/");
            this.getFilesAndFolders(relativePathString)
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
            console.log(this.sidebarFileName)
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
                case "Upload":
                    console.log("upload")
                    break;
                case"Download":
                    console.log("download");
                    break;
                case"Delete":
                    console.log("delete");
                    break;

            }
        }
    }
}
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
    overflow-y: auto;
}
</style>