<!--
<template>
  <div class="dropzone">
    <div v-bind="getRootProps()" class="drop-area">
      <input v-bind="getInputProps()" />
      <p v-if="isDragActive">Drop the files here ...</p>
      <p v-else>Drag 'n' drop some files here, or click to select files</p>
      <div v-if="isFocused" id="focus">
        focused
      </div>
      <div v-if="isDragReject" id="isDragReject">isDragReject: {{ isDragReject }}</div>
    </div>
    <button @click="onClick" class="open-button">open</button>
  </div>
</template>
-->
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

<script>
import { defineComponent, reactive } from "vue";
import { useDropzone } from "vue3-dropzone";
import FileHandling from "../fileHandling";
export default defineComponent({
  name: "DropZone",
  props: {
    msg: String,
  },
  methods: {
    onClick() {
      if (this.open) {
        this.open();
      }
    },
    toggleMulti() {
      this.options.multiple = !this.options.multiple;
    },
  },
  setup() {
    function onDrop(acceptedFiles, rejectReasons) {
      console.log("acceptedFiles", acceptedFiles);
      console.log("rejectReasons", rejectReasons);
      FileHandling.SendForUpload(acceptedFiles);
    }
    const options = reactive({
      multiple: true,
      onDrop,
      // accept: ".*",
    });
    const { getRootProps, getInputProps, ...rest } = useDropzone(options);
    return {
      options,
      getRootProps,
      getInputProps,
      ...rest,
    };
  },
});
</script>
<style scoped>
.dropzone {
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
</style>
