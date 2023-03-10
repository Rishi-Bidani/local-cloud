<template>
    <section class="dropzone-container">
        <div id="template-container"></div>
        <form
            action="/upload"
            class="dropzone drop-area"
            enctype="multipart/form-data"
            ref="dropzone"
            :key="1"
        ></form>
    </section>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Dropzone } from "dropzone";

// Dropzone.autoDiscover = true;
const dropzone = ref<HTMLFormElement | null>(null);

onMounted(() => {
    const _dropzone = new Dropzone(dropzone.value, dropzoneOptions);
});

const dropzoneOptions = {
    url: "/upload",
    chunking: true,
    // addedfile: function (file: { previewElement: any }) {
    //     // Now attach this new element some where in your page
    //     console.log("Added file:", file);
    // },
};
</script>

<style>
@import "../assets/css/dropzone.css";
@import "../assets/css/basic.css";
</style>

<style scoped>
.dropzone-container {
    /* position: absolute;
    inset: 0; */
    /* z-index: -1; */
    /* visibility: hidden; */
}
.dropzone-container form {
    height: 100%;
}
</style>
