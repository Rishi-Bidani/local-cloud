<template>
    <section class="container--files-folders">
        <article class="grid grid--folders">
            <figure
                v-for="(folder, index) in folders"
                :key="`Folder-${index}`"
                @click="navigateFolder(folder)"
                @contextmenu.prevent="this.$emit('context-menu-invoked', folder, $event)"
            >
                <img src="../assets/folder.svg" alt="Folder" class="icon icon--folder" />
                <figcaption>{{ folder }}</figcaption>
            </figure>
        </article>
        <article class="grid grid--files">
            <figure
                v-for="(file, index) in files"
                :key="`File-${index}`"
                :ref="`File-${index}`"
                class="file-padding"
                v-on:click.ctrl.exact="this.$emit('download-file', file.fileName)"
                @click.exact="fileClicked(index, file.fileName, file.fileSize)"
            >
                <img
                    v-if="file.fileExtension === '.txt'"
                    src="../assets/fileLogos/txt.svg"
                    class="icon--file"
                    alt="txt file"
                />
                <img
                    v-else-if="file.fileExtension === '.pdf'"
                    src="../assets/fileLogos/pdf.svg"
                    class="icon--file"
                    alt="pdf file"
                />
                <img
                    class="icon--file"
                    v-else-if="file.fileExtension === '.xlsx' || file.fileExtension === '.xls'"
                    src="../assets/fileLogos/excel.svg"
                    alt="excel file"
                />
                <img
                    class="icon--file"
                    v-else-if="file.fileExtension === '.pptx' || file.fileExtension === '.ppt'"
                    src="../assets/fileLogos/ppt.svg"
                />
                <img
                    class="icon--file"
                    v-else-if="
                        ['.png', '.jpeg', '.jpg', '.svg', '.gif'].includes(file.fileExtension)
                    "
                    src="../assets/fileLogos/image.svg"
                    alt="image file"
                />
                <img
                    class="icon--file"
                    v-else-if="['.docx', '.doc'].includes(file.fileExtension)"
                    src="../assets/fileLogos/word.svg"
                />
                <img
                    class="icon--file"
                    v-else-if="['.mp4', '.mov', '.mkv', '.webm'].includes(file.fileExtension)"
                    src="../assets/fileLogos/video.svg"
                    alt="video file"
                />
                <img
                    class="icon--file"
                    v-else-if="['.mp3'].includes(file.fileExtension)"
                    src="../assets/fileLogos/music.svg"
                    alt="music file"
                />
                <img v-else src="../assets/fileLogos/warning.svg" class="icon--file" />
                <figcaption>{{ file.fileName }}</figcaption>
            </figure>
        </article>
    </section>
</template>

<script>
export default {
    name: "FilesAndFolders",
    props: {
        files: Array,
        folders: Array,
    },
    data() {
        return {};
    },
    methods: {
        navigateFolder(folderName) {
            this.$emit("clicked-folder", folderName);
        },
        fileClicked(itemNumber, fileName, fileSize) {
            this.$emit("file-clicked", fileName, fileSize);
        },
    },
};
</script>

<style scoped>
.container--files-folders {
    --icon-file-height: 5rem;
    --icon-folder-height: 7.5rem;
}

.container--files-folders {
    display: flex;
    flex-flow: column;
    height: fit-content;
    padding: 1rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    grid-gap: 2rem;
    place-items: start;
}

.icon--folder {
    height: var(--icon-folder-height);
}

.icon--file {
    height: var(--icon-file-height);
}

.file-padding {
    padding: 1rem;
}

figure {
    display: flex;
    flex-flow: column;
    cursor: pointer;
    border-radius: 1rem;
    border: none;
    padding: 1rem;
    place-items: center;
    text-align: center;
    gap: 0.5rem;
}

figure:hover {
    background-color: var(--figure-hover);
}

figcaption {
    width: 8rem;
    font-weight: 700;
    word-break: break-all;
}

@media screen and (max-width: 1000px) {
    .container--files-folders {
        --icon-file-height: 3rem;
        --icon-folder-height: 4.5rem;
    }

    .grid {
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    }
}

@media screen and (max-width: 700px) {
    .container--files-folders {
        --icon-file-height: 2rem;
        --icon-folder-height: 2rem;
        font-size: 14px;
    }

    .grid {
        gap: 0;
    }

    figure {
        flex-flow: row;
        place-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        width: max-content;
    }
}

/*.active {*/
/*    background-color: var(--figure-hover))*/
/*}*/
</style>
