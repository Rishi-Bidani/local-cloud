<template>
    <section class="pc">
        <header>
            <h1>Local Cloud</h1>
        </header>
        <button class="button">create folder</button>
        <a href="/pictures" class="sidebar-item">pictures</a>
        <a href="/videos" class="sidebar-item">videos</a>
        <a href="/music" class="sidebar-item">music</a>
        <a href="/documents" class="sidebar-item">documents</a>
        <FileInformation :file-information="fileInformation" :current-path="currentPath" />
        <SidebarFooter @click-login="loginModal" />
    </section>
    <section class="mobile">
        <div class="mobile-item">settings</div>
        <div class="mobile-item">login</div>
    </section>
    <Login />
</template>
<script setup lang="ts">
import FileInformation from "./pc/FileInformation.vue";
import SidebarFooter from "./pc/SidebarFooter.vue";
import Login from "../modals/Login.vue";

function loginModal() {
    const loginModal = document.querySelector("dialog") as HTMLDialogElement;
    loginModal.showModal();
}

const props = defineProps<{
    fileInformation: { name: string; size: number } | null;
}>();
const currentPath = window.location.pathname;
</script>
<style scoped>
section.pc,
section.mobile {
    background-color: var(--secondary-color);
}
section.pc {
    display: none;
    overflow: hidden;
    overflow-y: auto;
}

section.mobile {
    --height: 50px;
    width: 100%;
    height: var(--height);
    position: absolute;
    bottom: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    z-index: 1;
}
.mobile-item {
    border-left: 1px solid var(--accent-color);
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.mobile-item:first-child {
    border-left: none;
}

@media screen and (min-width: 768px) {
    section.mobile {
        display: none;
    }

    section.pc {
        width: 300px;
        height: 100%;
        padding: 1em 2em;
        display: flex;
        flex-direction: column;
    }
}

header {
    padding-block: 1rem;
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
