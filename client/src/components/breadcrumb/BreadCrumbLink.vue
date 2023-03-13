<template>
    <a :href="location" v-if="location">
        <div class="container">
            <img :src="image" alt="" v-if="image" />
            <span>{{ text }}</span>
        </div>
    </a>
    <div v-else>
        <div class="container">
            <img :src="image" alt="" v-if="image" />
            <span>{{ text }}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

const text = ref("");

const props = defineProps<{
    image: any;
    text: string;
    location: string;
}>();

onMounted(() => {
    text.value = decodeURI(props.text);
});
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
