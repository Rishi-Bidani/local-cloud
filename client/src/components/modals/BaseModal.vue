<template>
    <dialog :data-modal="modalName">
        <form @submit="emitSubmit">
            <header class="flex">
                <h2>{{ heading }}</h2>
                <div class="close" @click="closeModal">X</div>
            </header>
            <slot></slot>
        </form>
    </dialog>
</template>
<script setup lang="ts">
const emits = defineEmits(["submit"]);

const props = defineProps<{
    modalName: string;
    heading: string;
}>();

function closeModal() {
    const dialog = document.querySelector(
        `dialog[data-modal="${props.modalName}"]`
    ) as HTMLDialogElement;
    dialog.close();
}

function emitSubmit(event: Event) {
    event.preventDefault();
    emits("submit", event);
}
</script>
<style scoped>
dialog {
    margin: auto;
    padding: 1rem;
}

dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}

form {
    display: flex;
    flex-flow: column;
    gap: 1rem;
}

form header {
    margin: 0;
    margin-bottom: 1rem;
    padding-block: 10px;
    justify-content: space-between;
    align-items: start;
    border-bottom: 2px solid var(--accent-color);
}
.close {
    cursor: pointer;
    background-color: var(--accent-color-2);
    padding: 0.5rem;
    color: var(--white);
    border-radius: 5px;
}

.close:hover {
    background-color: var(--accent-color-2-hover);
}

@media screen and (max-width: 600px) {
    dialog {
        width: 100%;
        padding: 0.5rem;
    }
}
</style>
