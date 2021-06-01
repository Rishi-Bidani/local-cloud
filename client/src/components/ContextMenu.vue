<template>
  <div class="ctx-container" :style="posStyle">
    <ul v-if="show">
      <li v-for="(item, itemIndex) in menu" :key="`ctx-item-${itemIndex}`">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ctxMenu",
  props: {
    menu: Array,
    show: {
      type: Boolean,
      default: false,
    },
    x: Number,
    y: Number,
  },
  computed: {
    posStyle() {
      return {
        "--top": this.y + "px",
        "--left": this.x + "px",
      };
    },
  },
};
</script>
<style scoped>
.ctx-container {
  height: fit-content;
  width: fit-content;
  position: fixed;
  top: var(--top);
  left: var(--left);
  background-color: seashell;
}
.ctx-container:hover {
  cursor: pointer;
}
ul {
  list-style: none;
}
li {
  padding: 0.5rem;
}
li:hover {
  background-color: lightgrey;
}
</style>
