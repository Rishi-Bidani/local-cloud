<template>
    <article class="file-information">
        <header>
            <h2>File Info</h2>
        </header>
        <div class="information-container flex-column gap-1" v-if="fileInformation">
            <p>Name: {{ fileInformation.name }}</p>
            <p>Size: {{ fileInformation.size }}</p>
            <a
                :href="'/download?pathname=' + currentPath + '/' + fileInformation.name"
                class="download"
            >
                open
            </a>
            <a
                :href="'/download/direct?pathname=' + currentPath + '/' + fileInformation.name"
                class="download"
            >
                download
            </a>
        </div>
    </article>
</template>
<script setup lang="ts">
// props
const props = defineProps<{
    fileInformation: { name: string; size: number } | null;
    currentPath: string;
}>();
</script>
<style scoped>
.download {
    text-decoration: none;
    background-color: var(--accent-color);
    color: var(--white);
    padding: 0.5em 1em;
    border-radius: 5px;
}

.download:hover {
    background-color: var(--accent-color-hover);
}
</style>
