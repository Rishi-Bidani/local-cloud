<template>
    <div class="context-menu">
        <slot name="menuitem"></slot>
    </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.context-menu {
    --radius: 5px;
    position: fixed;
    top: 0;
    left: 0;
    width: fit-content;
    min-height: 2rem;
    height: fit-content;
    padding: 0.5rem;
    background-color: var(--contextmenu-bg-color);
    border-radius: var(--radius);
}
</style>
