<template>
    <Sidebar />
    <main>
        <section class="main">
            <header>
                <BreadCrumb :navigationPath="navigationPath" />
            </header>
            <FilesAndFolders :files="files" :folders="folders" />
        </section>
    </main>
</template>

<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import BreadCrumb from "./components/breadcrumb/BreadCrumb.vue";

import { onMounted, ref, Ref, watch } from "vue";
import Navigate from "./requests/navigation";
import FilesAndFolders from "./components/FilesAndFolders.vue";

const navigationPath: Ref<string> = ref<string>(window.location.pathname);

const files = ref<Array<{ name: string; size: number }>>([]);
const folders = ref<Array<{ name: string }>>([]);

onMounted(async () => {
    // add event listener to window
    const response = await Navigate.toPath(navigationPath.value);
    console.log("Response:", response);
    files.value = response.files;
    folders.value = response.folders;
});
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

.main {
    height: 200vh;
    padding: 1rem 2rem;
}
</style>
