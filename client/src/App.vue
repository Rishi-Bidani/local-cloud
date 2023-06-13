<template>
    <Sidebar :fileInformation="fileInformation" />
    <main>
        <section class="main">
            <header ref="breadcrumbContainer" @wheel="horizontalScroll">
                <BreadCrumb :navigationPath="navigationPath" />
            </header>
            <div v-if="navigationError" class="error">
                {{ navigationError }}
            </div>
            <!-- drag exit leave-->
            <div class="display-container">
                <FilesAndFolders :files="files" :folders="folders" @selectedFile="selectedFile" />
                <div class="page-not-found" v-if="is404">
                    <img src="~@/assets/images/404transparent.png" alt="404 image" />
                </div>
                <Dropzone v-if="!is404" class="drop" />
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import Sidebar from "./components/sidebar/Sidebar.vue";
import BreadCrumb from "./components/breadcrumb/BreadCrumb.vue";
import Dropzone from "./components/Dropzone.vue";

import { onMounted, ref, Ref, watch, provide } from "vue";
import Navigate from "./requests/navigation";
import FilesAndFolders from "./components/FilesAndFolders.vue";

const navigationPath: Ref<string> = ref<string>(window.location.pathname);
const breadcrumbContainer = ref<HTMLDivElement | null>(null);
const fileInformation = ref<{ name: string; size: number } | null>(null);

interface FileInformation {
    name: string;
    size: number;
}

const is404: Ref<boolean> = ref<boolean>(false);
const files: Ref<FileInformation[]> = ref<FileInformation[]>([]);
const folders = ref<Array<{ name: string }>>([]);

function horizontalScroll(event: WheelEvent) {
    event.preventDefault();
    // scroll horizontally
    // console.log(event.target.parentElement);
    // event.target.scrollLeft += event.deltaY;
    breadcrumbContainer.value!.scrollLeft += event.deltaY;
}

function selectedFile(file: FileInformation | null): void {
    // console.log("Selected file:", file);
    fileInformation.value = file;
}

const navigationError = ref<string | null>(null);

onMounted(async () => {
    // add event listener to window
    const { data: response, error, status } = await Navigate.toPath(navigationPath.value);
    if (error) {
        console.error("[ERROR] Navigate: ", error);
        navigationError.value = error ?? "error";
        return;
    }
    files.value = response.files ?? [];
    folders.value = response.folders ?? [];

    is404.value = status === 404;
});

const checkLoggedIn = (): boolean => {
    try {
        return localStorage.getItem("token") ? true : false;
    } catch (error) {
        return false;
    }
};
const isLoggedIn = ref<boolean>(checkLoggedIn());

// watch changes for isLoggedIn
watch(isLoggedIn, (newValue) => {
    // refresh page
    window.location.reload();
});

function logout(): void {
    // ask for confirmation
    const confirmation = confirm("Are you sure you want to logout?");
    if (confirmation) {
        localStorage.removeItem("token");
        isLoggedIn.value = false;
    }
}

function checkAndUpdateLoggedIn() {
    isLoggedIn.value = checkLoggedIn();
}

// provide
provide("isLoggedIn", isLoggedIn);
provide("logout", logout);
provide("checkLogin", checkAndUpdateLoggedIn);
</script>
<style>
#app {
    height: 100%;
    display: flex;
    overflow: hidden;
}

main {
    overflow: auto;
    width: 100%;
}

.display-container {
    height: 100%;
    position: relative;
}

header {
    margin-block: 1rem;
}

.main {
    padding: 1rem 2rem;
    margin-bottom: 5rem;
}

.main header {
    overflow-x: auto;
    padding-bottom: 10px;
}

.main header::-webkit-scrollbar {
    height: 5px;
}

.main header::-webkit-scrollbar-track {
    background: var(--white);
}

.main header::-webkit-scrollbar-thumb {
    background: var(--accent-color);
}

.drop {
    height: 500px;
}

.page-not-found {
    width: 100%;
    display: flex;
}

.page-not-found img {
    width: min(100%, 1000px);
    margin: auto;
}

@media screen and (max-width: 768px) {
    .main {
        padding: 0.5rem;
    }

    header {
        margin-block: 0.5rem;
    }

    .drop {
        height: 100px;
        margin-bottom: 50px;
    }
}
</style>
