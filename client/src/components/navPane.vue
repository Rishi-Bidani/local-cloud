<template>
  <div class="nav-container"></div>
</template>
<script>
// import FileHandling from "../fileHandling";
export default {
  name: "NavPane",
  props: {
    navigator: [],
  },
  data() {
    return {
      newFolder: "",
    };
  },
};
</script>
<style>
.nav-container {
  height: 100%;
  width: 100%;
  background-color: red;
}
</style>
