<template>
    <section class="pc">
        <header>
            <h1>Local Cloud</h1>
            <Username />
        </header>
        <button class="button create-folder" @click="createFolderModal">create folder</button>
        <a href="/pictures" class="sidebar-item">pictures</a>
        <a href="/videos" class="sidebar-item">videos</a>
        <a href="/music" class="sidebar-item">music</a>
        <a href="/documents" class="sidebar-item">documents</a>
        <FileInformation :file-information="fileInformation" :current-path="currentPath" />
        <SidebarFooter @click-login="loginModal" />
    </section>
    <BottomBar />

    <Login />
    <CreateFolder />
    <MoreInformation />
</template>
<script setup lang="ts">
import FileInformation from "./pc/FileInformation.vue";
import SidebarFooter from "./pc/SidebarFooter.vue";
import Username from "./pc/Username.vue";
import BottomBar from "./mobile/BottomBar.vue";

// modals
import Login from "../modals/Login.vue";
import CreateFolder from "../modals/CreateFolder.vue";
import MoreInformation from "../modals/MoreInformation.vue";

function loginModal() {
    const loginModal = document.querySelector("dialog[data-modal='login']") as HTMLDialogElement;
    loginModal.showModal();
    // isLoggedIn.value = checkLoggedIn();
}

function createFolderModal() {
    const createFolderModal = document.querySelector(
        "dialog[data-modal='create-folder']"
    ) as HTMLDialogElement;
    createFolderModal.showModal();
}

const props = defineProps<{
    fileInformation: { name: string; size: number } | null;
}>();
const currentPath = window.location.pathname;
</script>
<style scoped>
section.pc,
section.pc {
    background-color: var(--secondary-color);
    display: none;
    overflow: hidden;
    overflow-y: auto;
}

.create-folder {
    background-color: var(--accent-color);
    color: var(--white);
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    cursor: pointer;
    font-weight: 700;
    text-transform: capitalize;
}

.create-folder:hover {
    background-color: var(--accent-color-hover);
}

@media screen and (min-width: 768px) {
    section.pc {
        width: 300px;
        height: 100%;
        padding: 1em 2em;
        display: flex;
        flex-direction: column;
    }
}

header {
    font-weight: 900;
}

a.sidebar-item {
    text-decoration: none;
    color: var(--primary-color);
}

.sidebar-item {
    text-transform: capitalize;
    padding-block: 1rem;
    font-weight: 700;
    cursor: pointer;
}
</style>
