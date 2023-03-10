<template>
    <a :href="location">
        <div class="container">
            <img :src="image" alt="" v-if="image" />
            <span>{{ text }}</span>
        </div>
    </a>
</template>
<script setup lang="ts">
const props = defineProps<{
    image: any;
    text: string;
    location: string;
}>();
</script>
<style scoped>
a {
    text-decoration: none;
    color: var(--white);
    position: relative;
}
.container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

img {
    height: 2rem;
}
</style>
