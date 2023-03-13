<template>
    <div class="container">
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
            <figure class="file" v-for="file in files" :key="file.name">
                <img
                    v-if="file.name.split('.').at(-1) === 'txt'"
                    src="~@/assets/filelogos/txt.svg"
                    alt="text file image"
                />
                <img
                    v-else-if="file.name.split('.').at(-1) === 'xlsx'"
                    src="~@/assets/filelogos/excel.svg"
                    alt="javascript file image"
                />
                <img
                    v-else-if="['jpg', 'jpeg', 'png'].includes(file.name.split('.').at(-1) as string)"
                    src="~@/assets/filelogos/image.svg"
                    alt="image"
                />
                <img v-else src="~@/assets/filelogos/warning.svg" alt="" />
                <figcaption>{{ file.name }}</figcaption>
            </figure>
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
    const currentPath = window.location.pathname;
    const nextPath = currentPath + "/" + folderName;
    // remove double slashes
    window.location.pathname = nextPath.replace(/\/{2,}/g, "/");
}
</script>
<style scoped>
.container {
    display: flex;
    flex-flow: column;
    gap: 2rem;
    margin-block: 2rem;
}

/* article.files,
article.folders {
    --size: 100px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--size), 1fr));
    gap: 1rem;
}

article figure img {
    width: var(--size);
} */

article.files figure,
article.folders figure {
    --size: 3rem;
    display: flex;
    gap: 1rem;
    align-items: center;
}

article.files figure img,
article.folders figure img {
    width: var(--size);
    height: var(--size);
}

@media screen and (min-width: 768px) {
    .container {
        margin-block: 4rem;
    }

    article.files,
    article.folders {
        --size: 100px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(var(--size), 1fr));
        gap: 1rem;
    }

    article.files figure,
    article.folders figure {
        --size: 100px;
        display: block;
    }

    article.files figure img,
    article.folders figure img {
        width: var(--size);
        height: var(--size);
    }
}

/* article.folders figure {
    padding: 1em;
} */

/* figure {
    height: 3rem;
} */
</style>
