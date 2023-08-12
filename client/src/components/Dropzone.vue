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
const dropzoneOptions = {
    url: "/upload",
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
    maxFilesize: 60000,
    // addedfile: function (file: { previewElement: any }) {
    //     // Now attach this new element some where in your page
    //     console.log("Added file:", file);
    // },
};
onMounted(() => {
    const _dropzone = new Dropzone(dropzone.value, dropzoneOptions);
    const currentPath = window.location.pathname;

    _dropzone
        .on("sending", (file: any, xhr: any, formData: any) => {
            console.log("Dropzone sending at path::: ", JSON.stringify(decodeURI(currentPath)));
            formData.append("pathname", currentPath);
        })
        .on("complete", (file: any) => {
            console.log("Dropzone complete");
            _dropzone.removeFile(file);
        })
        .on("success", (file: any, response: any) => {
            console.log("Dropzone success");
            console.log("Response: ", response);
        })
        .on("error", (file: any, errorMessage: any) => {
            console.log("Dropzone error");
            console.log("Error: ", errorMessage);
            alert(errorMessage);
        });
});
</script>

<style>
@import "../assets/css/dropzone.css";
@import "../assets/css/basic.css";
</style>

<style scoped>
.dropzone-container form {
    height: 100%;
}
</style>
