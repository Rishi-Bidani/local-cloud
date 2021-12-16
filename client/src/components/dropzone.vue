<template>
    <section class="dropzone-container center">
        <form
            :action="uploadURL"
            class="dropzone drop-area"
            enctype="multipart/form-data"
            id="myDropzone"
            ref="myDropzone"
            :key="`dz-${dropzoneKey}`"
        >
            <input type="hidden" name="relPath" :value="currentPath"/>
        </form>
        <button class="finish-button" @click="finishUpload">Finish Upload</button>
    </section>
</template>

<script>
const Dropzone = require("dropzone/dist/dropzone.js");
import Request from "@/js/requests";

console.log(Dropzone)
Dropzone.autoDiscover = true;
export default {
    name: "Dropzone",
    props: ["currentPath"],
    data() {
        return {
            uploadURL: Request.uploadURL(),
            dropzoneKey: 0,
        };
    },
    mounted() {
        this.dropconfig();
    },
    methods: {
        finishUpload() {
            this.$refs.myDropzone.dropzone.removeAllFiles();
            this.$emit("finishedUpload");
        },
        dropconfig() {
            Dropzone.Dropzone.options.myDropzone = {
                maxFilesize: 60000, //MB = 60GB
            };
        },
    },
};
</script>

<style scoped>
@import "../assets/css/dropzone.min.css";

.dropzone-container {
    height: 80vh;
    width: 90%;
    /*border: dotted black;*/
    align-self: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
}

.drop-area {
    height: 100%;
    width: 100%;
}

.open-button {
    /* position: absolute; */
    /* bottom: 0; */
    padding: 1rem 2rem; /* Remove for svg */
    width: 20%;
    align-self: center;
    justify-content: center;
    cursor: pointer;
}

.finish-button {
    height: 2rem;
    background-color: #65a65a;
    cursor: pointer;
    border: none;
    color: black;
    font-weight: bold;
}

.finish-button:hover {
    background-color: #5c9752;
}
</style>