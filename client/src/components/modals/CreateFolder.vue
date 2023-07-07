<template>
    <BaseModal :modal-name="'create-folder'" :heading="'Create Folder'" @submit="createFolder">
        <section class="container">
            <div class="form-item">
                <label for="folder-name">Folder Name</label>
                <input type="text" name="folder-name" id="folder-name" />
            </div>
            <p class="error">{{ errorMessage }}</p>
            <button type="submit">Create</button>
        </section>
    </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from "./BaseModal.vue";
import { Ref, ref } from "vue";

const errorMessage: Ref<string> = ref("");

async function createFolder(event: Event) {
    event.preventDefault();
    const currentPath = window.location.pathname.replace(/^\/|\/$/g, "");
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const folderName = formData.get("folder-name");

    console.log(currentPath);
    const response = await fetch("/create/folder", {
        method: "POST",
        body: JSON.stringify({
            folderName,
            pathname: currentPath,
        }),
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
    });
    // check status
    if (response.status === 200) {
        // reload page
        errorMessage.value = "";
        window.location.reload();
    } else {
        // write message to error
        errorMessage.value = await response.text();
    }
}
</script>
<style scoped>
.container {
    display: flex;
    flex-flow: column;
    gap: 1rem;
}

.form-item {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
    align-items: center;
}

@media screen and (max-width: 768px) {
    .form-item {
        grid-template-columns: 1fr;
    }
}

input[type="text"] {
    padding: 0.5rem;
    border: 1px solid var(--secondary-color);
    border-radius: 5px;
}

button[type="submit"] {
    padding: 0.5rem;
    background-color: var(--accent-color);
    color: var(--white);
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
button[type="submit"]:hover {
    background-color: var(--accent-color-hover);
}

.error {
    color: red;
}
</style>
