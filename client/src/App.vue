<template>
    <Sidebar />
    <main></main>
</template>

<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";

import { onMounted, ref, Ref, watch } from "vue";
import Navigate from "./requests/navigation";

const navigationPath: Ref<string> = ref<string>(window.location.pathname);

onMounted(async () => {
    // add event listener to window
    console.log(navigationPath.value);
    const response = await Navigate.toPath(navigationPath.value);
    console.log(response);
});
// watch naviggationPath for changes
watch(navigationPath, (newPath: string) => {
    console.log(newPath);
});
</script>
<style>
#app {
    height: 100%;
}
</style>
