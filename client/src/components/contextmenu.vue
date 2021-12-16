<template>
    <section
        :style="styleCtx"
        @mouseleave="mouseLeave"
        class="container--ctx-menu"
    >
        <ul v-if="show && active">
            <li v-for="(item, itemIndex) in menu"
                :key="`ctx-item-${itemIndex}`"
                @click="sendClick(item)"
            >
                {{ item }}
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: "ContextMenu",
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
            active: true
        }
    },
    computed: {
        styleCtx() {
            return {
                "--top": this.y + "px",
                "--left": this.x + "px",
            }
        }
    },
    methods: {
        mouseLeave() {
            this.active = false;
        },
        sendClick: function (item) {
            this.$emit("clickedItem", item);
            this.mouseLeave();
        },
    }
}
</script>

<style scoped>
.container--ctx-menu {
    height: fit-content;
    width: fit-content;
    position: fixed;
    top: var(--top);
    left: var(--left);
    background-color: seashell;
}

.container--ctx-menu:hover {
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