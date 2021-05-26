<template>
  <div class="main-container2" :key="`ref-${refreshKey}`">
    <div class="HomeGrid">
      <figure
        v-for="(folder, index) in folders"
        :key="`Folder-${index}`"
        v-on:click="navigation(folder)"
      >
        <img src="../assets/folder.svg" alt="Folder" class="folderIcon" />
        <figcaption>{{ folder }}</figcaption>
      </figure>
    </div>
    <div class="HomeGrid">
      <!-- <figure
        v-for="(file, index) in files"
        :key="`File-${index}`"
        class="file-padding"
        v-on:click="download(file.fileName)"
      > -->
      <figure
        v-for="(file, index) in files"
        :key="`File-${index}`"
        class="file-padding"
        v-on:click.ctrl.exact="autodownload(file.fileName)"
        @click.exact="
          emitDetails(file.fileSize);
          download(file.fileName);
        "
      >
        <img
          v-if="file.fileExtension == '.txt'"
          src="../assets/fileLogos/txt.svg"
          class="fileIcon"
        />
        <img
          v-else-if="file.fileExtension == '.pdf'"
          src="../assets/fileLogos/pdf.svg"
          class="fileIcon"
        />
        <img
          class="fileIcon"
          v-else-if="file.fileExtension == '.xlsx' || file.fileExtension == '.xls'"
          src="../assets/fileLogos/excel.svg"
        />
        <img
          class="fileIcon"
          v-else-if="file.fileExtension == '.pptx' || file.fileExtension == '.ppt'"
          src="../assets/fileLogos/ppt.svg"
        />
        <img
          class="fileIcon"
          v-else-if="['.png', '.jpeg', '.jpg', '.svg', '.gif'].includes(file.fileExtension)"
          src="../assets/fileLogos/image.svg"
        />
        <img
          class="fileIcon"
          v-else-if="['.docx', '.doc'].includes(file.fileExtension)"
          src="../assets/fileLogos/word.svg"
        />
        <img v-else src="../assets/fileLogos/warning.svg" class="fileIcon" />
        <figcaption>{{ file.fileName }}</figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
import FileHandling from "../fileHandling";
export default {
  name: "Home",
  props: ["getPropDirPath"],
  data() {
    return {
      folders: [],
      files: [],
      error: "",
      getDirPath: ".",
      refreshKey: 0,
    };
  },
  async created() {
    try {
      // this.folders = await FileHandling.getDirectories(".");
      this.folders = FileHandling.getDirectories(this.getPropDirPath).then((arrItems) => {
        this.folders = arrItems.data.sendFolders;
      });
      this.files = FileHandling.getDirectories(this.getPropDirPath).then((arrItems) => {
        this.files = arrItems.data.sendFiles;
      });
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    download: function(item) {
      console.log(item);
      // FileHandling.SendForDownload(this.getPropDirPath, item);
      this.$emit("linkForDownload", {
        gpdp: this.getPropDirPath,
        fname: item,
      });
    },
    navigation: function(item) {
      this.getDirPath = this.getPropDirPath + `/${item}`;
      console.log(this.getDirPath);
      this.$emit("folderPath", this.getDirPath);
    },
    emitDetails: function(fileSize) {
      // console.log(fileSize);
      this.$emit("fileSize", fileSize);
    },
    autodownload: function(item) {
      console.log("double click");
      FileHandling.SendForDownload(this.getPropDirPath, item);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container2 {
  width: 100%;
  height: 100%;
}
.HomeGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  grid-gap: 2rem;
  margin: 2rem;
}
.folderIcon {
  height: 7.5rem;
}
.fileIcon {
  height: 5rem;
}
.file-padding {
  padding: 1rem;
}
figure {
  cursor: pointer;
  border-radius: 1rem;
  border: none;
  /* transition: all 0.5s ease-out; */
}
figure:hover {
  /* border: 2px solid whitesmoke; */
  background-color: cornsilk;
}

figcaption {
  font-weight: 700;
}
</style>
