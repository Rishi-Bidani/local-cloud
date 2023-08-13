<template>
    <div class="container">
        <article class="folders">
            <figure
                v-for="folder in folders"
                :key="folder.name"
                @click="(e) => navigateTo(e, folder.name)"
                @contextmenu.prevent="(e) => Context.open(e, folder.name)"
            >
                <img src="~@/assets/icons/folder.svg" alt="folder" />
                <figcaption>{{ folder.name }}</figcaption>
            </figure>
        </article>
        <article class="files">
            <figure
                class="file"
                v-for="file in files"
                :key="file.name"
                @click="toggleInformation"
                v-on:click.ctrl.exact="downloadFileDirect"
                :data-filename="file.name"
                :data-filesize="file.size"
            >
                <!-- text file -->
                <img
                    v-if="file.name.split('.').at(-1) === 'txt'"
                    src="~@/assets/filelogos/txt.svg"
                    alt="text file image"
                />
                <!-- excel -->
                <img
                    v-else-if="file.name.split('.').at(-1) === 'xlsx'"
                    src="~@/assets/filelogos/excel.svg"
                    alt="javascript file image"
                />
                <!-- image -->
                <img
                    v-else-if="['jpg', 'jpeg', 'png', 'svg'].includes(file.name.split('.').at(-1) as string)"
                    src="~@/assets/filelogos/image.svg"
                    alt="image"
                />
                <!-- video -->
                <img
                    v-else-if="['mp4', 'webm', 'ogg'].includes(file.name.split('.').at(-1) as string)"
                    src="~@/assets/filelogos/video.svg"
                    alt="video"
                />
                <!-- pdf -->
                <img
                    v-else-if="file.name.split('.').at(-1) === 'pdf'"
                    src="~@/assets/filelogos/pdf.svg"
                    alt="pdf"
                />
                <img v-else src="~@/assets/filelogos/warning.svg" alt="" @drag="false" />
                <figcaption :data-filename="file.name">{{ file.name }}</figcaption>

                <footer class="hidden">
                    <span>File size: {{ (file.size / Math.pow(10, 6)).toFixed(2) }} MB</span>
                    <button class="download" @click="downloadFile">download</button>
                </footer>
            </figure>
        </article>
    </div>
    <ContextMenu class="hidden" v-click-outside="Context.close" v-esc="Context.close">
        <template #menuitem>
            <div class="item" @click="Context.exexuteOption('zip')">zip</div>
            <div class="item" @click="Context.exexuteOption('delete')">delete</div>
        </template>
    </ContextMenu>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import ContextMenu from "./ContextMenu.vue";
import Context from "../javascript/contextmenu";

const viewportWidth = ref(window.innerWidth);
const isSidebarVisible = ref(viewportWidth.value > 768);

const fileInformation = ref<{ name: string; size: number } | null>(null);
const emit = defineEmits(["selectedFile"]);

// watch changes for fileInformation
watch(fileInformation, (newValue) => {
    emit("selectedFile", newValue);
});

onMounted(() => {
    window.addEventListener("resize", () => {
        viewportWidth.value = window.innerWidth;
        isSidebarVisible.value = viewportWidth.value > 768;

        // deselct any active file
        deselectActiveFile();
    });

    isSidebarVisible.value = viewportWidth.value > 768;
});

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

function toggleInformation(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const figure = target.closest("figure");

    // check if current file is already active
    if (figure?.classList.contains("active-file")) {
        // deselect any active file
        deselectActiveFile();
        fileInformation.value = null;
        return;
    } else {
        deselectActiveFile();
        // make figure active
        figure?.classList.add("active-file");
        if (!isSidebarVisible.value) {
            figure?.querySelector("footer")?.classList.remove("hidden");
        }

        // get file information
        const fileName = figure?.dataset.filename;
        const fileSize = figure?.dataset.filesize;
        if (fileName && fileSize) {
            fileInformation.value = {
                name: fileName,
                size: Number(fileSize),
            };
        }
    }
}

function downloadFile(event: MouseEvent) {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    const figure = target.closest("figure");
    if (figure) {
        const fileName = figure.querySelector("figcaption")?.dataset.filename;
        const fullpath = window.location.pathname + fileName;
        if (fileName) {
            window.location.href = `/download?pathname=${fullpath}`;
        }
    }
}

function downloadFileDirect(event: MouseEvent) {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    const figure = target.closest("figure");
    if (figure) {
        const fileName = figure.querySelector("figcaption")?.dataset.filename;
        const fullpath = window.location.pathname + fileName;
        if (fileName) {
            window.location.href = `/download/direct?pathname=${fullpath}`;
        }
    }
}

function deselectActiveFile() {
    const activeFile = document.querySelector(".active-file");
    if (activeFile) {
        activeFile.classList.remove("active-file");
        // hide footer
        const footer = activeFile.querySelector("footer");
        if (footer) {
            footer.classList.add("hidden");
        }
    }
}
</script>
<style scoped>
.item {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: var(--radius);
    color: var(--contextmenu-text-color);
}

.item:hover {
    background-color: var(--contextmenu-hover-color);
}

.container {
    display: flex;
    flex-flow: column;
    gap: 2rem;
    margin-block: 2rem;
}

.active-file {
    background-color: var(--secondary-color);
    flex-wrap: wrap;
    width: fit-content;
    border-radius: 5px;
}

.file footer:not(.hidden) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding-inline: 5px;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.file footer button {
    padding: 5px 10px;
    cursor: pointer;
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
    --size: 5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 10px;
}

article.files figure img,
article.folders figure img {
    width: var(--size);
    height: var(--size);
}

figcaption {
    word-break: break-all;
}

@media screen and (min-width: 768px) {
    .container {
        margin-block: 4rem;
    }

    article.files,
    article.folders {
        --size: 120px;
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
</style>
