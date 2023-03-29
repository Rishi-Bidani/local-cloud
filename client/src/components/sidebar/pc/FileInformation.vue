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
                class="download button"
            >
                <img src="~@/assets/icons/open.svg" alt="open" />
                open
            </a>
            <a
                :href="'/download/direct?pathname=' + currentPath + '/' + fileInformation.name"
                class="download button"
            >
                <img src="~@/assets/icons/download.svg" alt="download" />
                download
            </a>
            <button class="button red delete">
                <img src="~@/assets/icons/delete.svg" alt="delete" />
                delete
            </button>
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
.file-information {
    margin-bottom: 1rem;
}
.button {
    text-decoration: none;
    padding: 0.5em 1em;
    border: none;
    border-radius: 5px;
    display: flex;
    place-items: center;
    color: var(--white);
    font-size: 1rem;
    gap: 0.5rem;
    height: 2.5rem;
}

.button:hover {
    cursor: pointer;
}

.red {
    background-color: var(--accent-color-2);
}

.red:hover {
    background-color: var(--accent-color-2-hover);
}

.download {
    background-color: var(--accent-color);
}

.button img {
    height: 100%;
}

.download:hover {
    background-color: var(--accent-color-hover);
}
</style>
