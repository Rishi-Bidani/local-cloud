<!-- <div @click="onClick" class="open-button">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#FF0066"
          d="M56,-4.5C56,18.2,28,36.4,0.5,36.4C-27,36.4,-53.9,18.2,-53.9,-4.5C-53.9,-27.2,-27,-54.4,0.5,-54.4C28,-54.4,56,-27.2,56,-4.5Z"
          transform="translate(100 100)"
        />
        <text x="80" y="100" fill="black">Open</text>
      </svg>
    </div> -->

<template>
  <div class="dropzone-container">
    <form
      :action="uploadurl"
      class="dropzone drop-area"
      enctype="multipart/form-data"
      id="myDropzone"
      ref="myDropzone"
      :key="`dz-${dzkey}`"
    >
      <input type="hidden" name="path" :value="currentPath" />
    </form>
    <button class="finish-button" @click="finishUpload">Finish Upload</button>
  </div>
</template>

<script>
// import * as Dropzone from "dropzone/dist/min/dropzone.min.js";
import FileHandling from "../fileHandling";
const Dropzone = require("dropzone/dist/dropzone.js");
// Updated default maxFilesize in dropzone.js directly - line 7089
// New default maxFileSize = 15000 mib
Dropzone.autoDiscover = true;
export default {
  name: "DropZone",
  props: ["currentPath"],
  data() {
    return {
      uploadurl: FileHandling.SendForUpload(),
      dzkey: 0,
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
@import "../frontEndjs/dropzone.min.css";

.dropzone-container {
  position: relative;
  height: 80vh;
  width: 90%;
  border: dotted black;
  align-self: center;
  margin: 2rem;
  display: flex;
  flex-direction: column;
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
