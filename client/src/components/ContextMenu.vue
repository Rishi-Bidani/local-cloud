// Copyright 2020-2021 Rishi Bidani
<template>
  <div
    class="ctx-container"
    :style="posStyle"
    @mouseleave="removeActive"
    :key="`container-${contKey}`"
  >
    <ul v-if="show && active">
      <li
        v-for="(item, itemIndex) in menu"
        :key="`ctx-item-${itemIndex}`"
        @click="sendClickAction(item)"
      >
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
  data() {
    return {
      active: true,
      contKey: 0,
    };
  },
  computed: {
    posStyle() {
      return {
        "--top": this.y + "px",
        "--left": this.x + "px",
      };
    },
  },
  methods: {
    removeActive: function() {
      this.active = false;
      this.contKey++;
    },
    sendClickAction: function(item) {
      this.$emit("clickedItem", item);
      this.removeActive();
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
  padding: 0.5rem 1rem;
  list-style: none;
}
li {
  padding: 0.5rem 1rem;
  text-align: left;
}
li:hover {
  background-color: lightgrey;
  border-radius: 0.2rem;
}
</style>
