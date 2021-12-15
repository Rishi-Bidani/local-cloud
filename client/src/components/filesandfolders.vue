<template>
    <div class="container">
        <div class="grid">
            <figure
                v-for="(folder, index) in folders"
                :key="`Folder-${index}`"
                @click="navigateFolder(folder)"
            >
                <img src="../assets/folder.svg" alt="Folder" class="icon icon--folder"/>
                <figcaption>{{ folder }}</figcaption>
            </figure>
        </div>
        <div class="grid">
            <figure
                v-for="(file, index) in files"
                :key="`File-${index}`"
                class="file-padding"
                v-on:click.ctrl.exact="this.$emit('download-file', file.fileName)"
                @click.exact="
                    emitDetails({ name: file.fileName, size: file.fileSize, fname: file.fileName })
                "
            >
                <img
                    v-if="file.fileExtension === '.txt'"
                    src="../assets/fileLogos/txt.svg"
                    class="icon--file"
                />
                <img
                    v-else-if="file.fileExtension === '.pdf'"
                    src="../assets/fileLogos/pdf.svg"
                    class="icon--file"
                />
                <img
                    class="icon--file"
                    v-else-if="file.fileExtension === '.xlsx' || file.fileExtension === '.xls'"
                    src="../assets/fileLogos/excel.svg"
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
                />
                <img
                    class="icon--file"
                    v-else-if="['.mp3'].includes(file.fileExtension)"
                    src="../assets/fileLogos/music.svg"
                />
                <img v-else src="../assets/fileLogos/warning.svg" class="icon--file"/>
                <figcaption>{{ file.fileName }}</figcaption>
            </figure>
        </div>
    </div>
</template>

<script>
export default {
    name: "FilesAndFolders",
    props: {
        files: Array,
        folders: Array
    },
    methods: {
        navigateFolder(folderName) {
            this.$emit("clicked-folder", folderName)
        }
    }
}
</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    grid-gap: 2rem;
    margin: 2rem;
    place-items: center;
}

.icon--folder {
    height: 7.5rem;
}

.icon--file {
    height: 5rem;
}

.file-padding {
    padding: 1rem;
}

figure {
    cursor: pointer;
    border-radius: 1rem;
    border: none;
    padding: 1rem;
    /* transition: all 0.5s ease-out; */
}

figure:hover {
    /* border: 2px solid whitesmoke; */
    background-color: var(--figure-hover);
}

figcaption {
    width: 8rem;
    font-weight: 700;
    word-break: break-all;
}
</style>