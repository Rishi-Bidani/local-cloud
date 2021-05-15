<template>
  <div class="main-container">
    <h1>{{ folders.data }}</h1>
  </div>
</template>

<script>
import FileHandling from "../fileHandling";
export default {
  name: "Home",
  data(){
    return{
      folders: [],
      files: [],
      error:""
    }
  },
  async created(){
    try {
      this.folders = await FileHandling.getDirectories(".");
    } catch (error) {
      this.error = error;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
