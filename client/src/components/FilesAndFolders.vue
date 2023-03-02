<template>
    <div>
        <article class="folders">
            <figure
                v-for="folder in folders"
                :key="folder.name"
                @click="(e) => navigateTo(e, folder.name)"
            >
                <img src="~@/assets/icons/folder.svg" alt="folder" />
                <figcaption>{{ folder.name }}</figcaption>
            </figure>
        </article>
        <article class="files">
            <div class="file" v-for="file in files">{{ file.name }}</div>
        </article>
    </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
    files: Array<{ name: string; size: number }>;
    folders: Array<{ name: string }>;
}>();

function navigateTo(event: MouseEvent, folderName: string) {
    window.location.pathname = window.location.pathname + folderName;
}
</script>
<style scoped>
article.folders {
    --folder-size: 100px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--folder-size), 1fr));
}

/* article.folders figure {
    padding: 1em;
} */

/* figure {
    height: 3rem;
} */
</style>
