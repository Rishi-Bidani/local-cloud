<template>
    <section class="mobile">
        <div class="mobile-item" @click="moreInformation">more</div>
        <!-- <div class="mobile-item">login</div> -->
        <div class="mobile-item create-folder" @click="createFolderModal">+</div>
        <div v-if="!isLoggedIn" class="mobile-item login flex" @click="loginModal">login</div>
        <div v-else class="mobile-item logout flex" @click="logout()">logout</div>
    </section>
</template>
<script setup lang="ts">
import { inject } from "vue";

const isLoggedIn = inject("isLoggedIn");
const logout: any = inject("logout");

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

function moreInformation() {
    const moreInformationModal = document.querySelector(
        "dialog[data-modal='more-information']"
    ) as HTMLDialogElement;
    moreInformationModal.showModal();
}
</script>
<style scoped>
.create-folder {
    width: var(--height);
    height: var(--height);
    border-radius: 50%;
    background-color: var(--accent-color);
}

section.mobile {
    --height: 50px;

    /* background-color: var(--secondary-color); */
    width: 100%;
    height: var(--height);
    position: fixed;
    bottom: 0;
    display: grid;
    grid-template-columns: 1fr var(--height) 1fr;
    place-items: center;
    z-index: 1;
}

section.mobile * {
    background-color: var(--secondary-color);
}

.mobile-item:last-child,
.mobile-item:first-child {
    position: relative;
    overflow: hidden;
}
.mobile-item:last-child::before,
.mobile-item:first-child::after {
    --translate-x: 90%;

    content: "";
    position: absolute;
    height: var(--height);
    aspect-ratio: 1;
    background-color: var(--bg-color);
    border-radius: 50%;
}

.mobile-item:first-child::after {
    right: 0;
    translate: var(--translate-x);
}

.mobile-item:last-child::before {
    left: 0;
    translate: calc(var(--translate-x) * -1);
}

.mobile-item {
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.mobile-item:hover {
    background-color: var(--hover-color);
}

/* .mobile-item:first-child {
    border-left: none;
} */

@media screen and (min-width: 768px) {
    section.mobile {
        display: none;
    }
}
</style>
