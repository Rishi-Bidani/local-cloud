<template>
  <div class="main-container">
    <!-- <h1>{{ folders }}</h1> -->
    <ul>
      <li v-for="(folder, index) in folders" :key="Folder - index">
        <img src="../assets/folder.svg" alt="Folder" />
        {{ index }}
        {{ folder }}
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
