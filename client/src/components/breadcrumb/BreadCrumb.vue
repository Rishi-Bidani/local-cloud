<template>
    <div>
        <nav>
            <!-- <a href="/" class="breadcrumb-home">
                <div class="breadcrumb-home-container">
                    <img src="~@/assets/icons/home.svg" alt="home" class="breadcrumb-icon" />
                    <span>Home</span>
                </div>
            </a> -->
            <!-- breadcrumb link home -->
            <ol class="container">
                <li class="breadcrumb-item">
                    <BreadCrumbLink :image="homeIcon" text="Home" location="/" />
                </li>
                <li v-for="(item, index) in navigationItems" @click="(e) => navigateTo(e, index)">
                    <BreadCrumbLink :key="item" :image="null" :text="item" :location="item" />
                </li>
            </ol>
        </nav>
    </div>
</template>
<script setup lang="ts">
import BreadCrumbLink from "./BreadCrumbLink.vue";
import homeIcon from "@/assets/icons/home.svg";

const props = defineProps<{
    navigationPath: string;
}>();

const navigationItems = props.navigationPath.split("/").filter((item) => item !== "");

function navigateTo(event: MouseEvent, index: number) {
    event.preventDefault();
    event.stopPropagation();
    window.location.pathname = navigationItems.slice(0, index + 1).join("/");
    console.log(navigationItems);
}
</script>

<style scoped>
nav {
    --nav-height: 3rem;
    height: var(--nav-height);
}

ol.container {
    width: fit-content;
    list-style: none;
    display: flex;
    align-items: center;
}

ol.container li {
    height: var(--nav-height);
}

/* li:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
} */
/* 
li:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
} */

li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--accent-color);
    padding: 0.5rem 1rem;
    cursor: pointer;
}

li:first-child {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
}

li:last-child {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}

li:first-child ~ li:not(:last-child) {
    border-left: 1px solid var(--hover-color);
    border-right: 1px solid var(--hover-color);
}

li:first-child {
    border-right: 1px solid var(--hover-color);
}

li:hover {
    background-color: var(--hover-color);
}
</style>

<!-- <style scoped>
nav {
    --breadcrumb-color: var(--accent-color);
    color: var(--white);
    height: 3rem;
    display: flex;
    overflow-x: auto;
}

nav a {
    text-decoration: none;
    color: var(--white);
}
.breadcrumb-home-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--breadcrumb-color);
    width: fit-content;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.breadcrumb-icon {
    height: 30px;
    filter: invert(1);
}

.breadcrumb-home {
    display: flex;
    height: 100%;
}

.breadcrumb-home::after {
    content: "";
    height: 100%;
    width: 40px;
    background-color: var(--breadcrumb-color);
    clip-path: polygon(0 0, 50% 50%, 0 100%);
}
</style> -->
