<template>
  <div class="main-container">
    <!-- <h1>{{ folders }}</h1> -->
    <span class="title2">Folders</span>
    <ul>
      <li v-for="(folder, index) in folders" :key="`Folder-${index}`">
        <img src="../assets/folder.svg" alt="Folder" />
        {{ folder }}
      </li>
    </ul>
    <span class="title2">Files</span>
    <ul>
      <li v-for="(file, index) in files" :key="`File-${index}`">
        <img v-if="file.fileExtension == '.txt'" src="../assets/fileLogos/txt.svg" />
        <img v-else-if="file.fileExtension == '.pdf'" src="../assets/fileLogos/pdf.svg" />
        <img
          v-else-if="file.fileExtension == '.xlsx' || file.fileExtension == '.xls'"
          src="../assets/fileLogos/excel.svg"
        />
        <img
          v-else-if="file.fileExtension == '.pptx' || file.fileExtension == '.ppt'"
          src="../assets/fileLogos/ppt.svg"
        />
        <img
          v-else-if="['.png', '.jpeg', '.jpg', '.svg'].includes(file.fileExtension)"
          src="../assets/fileLogos/image.svg"
        />
        <img
          v-else-if="['.docx', '.doc'].includes(file.fileExtension)"
          src="../assets/fileLogos/word.svg"
        />
        <img v-else src="../assets/fileLogos/warning.svg" />

        {{ file.fileName }}
      </li>
    </ul>
  </div>
</template>

<script>
import FileHandling from "../fileHandling";
export default {
  name: "Home",
  data() {
    return {
      folders: [],
      files: [],
      error: "",
    };
  },
  async created() {
    try {
      // this.folders = await FileHandling.getDirectories(".");
      this.folders = FileHandling.getDirectories(".").then((arrItems) => {
        this.folders = arrItems.data.sendFolders;
      });
      this.files = FileHandling.getDirectories(".").then((arrItems) => {
        this.files = arrItems.data.sendFiles;
      });
    } catch (error) {
      this.error = error;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container {
  margin-left: 50px;
  width: fit-content;
  display: flex;
  flex-direction: column;
}
ul {
  list-style: none;
}
li {
  text-align: left;
  padding: 0.5rem 0;
}
img {
  height: 2rem;
  vertical-align: bottom;
}
</style>
