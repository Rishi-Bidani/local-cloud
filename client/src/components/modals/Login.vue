<template>
    <BaseModal :modal-name="'login'" :heading="'Login'" @submit="loginSubmit">
        <div class="form-container flex-column gap-1">
            <div class="form-item">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" />
            </div>
            <div class="form-item">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>
        </div>
        <p class="error">{{ errorMessage }}</p>
        <button type="submit">Login</button>
    </BaseModal>
</template>
<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import BaseModal from "./BaseModal.vue";

// requests
import authorisation from "../../requests/authentication";

const dialog = ref<HTMLDialogElement | null>(null);
const errorMessage = ref("");

const checkLogin: any = inject("checkLogin");

onMounted(() => {
    dialog.value = document.querySelector("dialog") as HTMLDialogElement;
});

async function loginSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const response = await authorisation.login(
        formData.get("username") as string,
        formData.get("password") as string
    );

    console.log(response);
    // // check status
    if (response.status === 200) {
        const { accessToken } = await response.json();
        console.log(accessToken);
        errorMessage.value = "";
        // set token in local storage
        localStorage.setItem("token", accessToken);
        // clear and close dialog
        form.reset();
        dialog.value?.close();
        checkLogin();
    } else if (response.status === 401) {
        errorMessage.value = "Invalid credentials";
        console.log("Invalid credentials");
    } else {
        errorMessage.value = "Something went wrong";
        console.log("Something went wrong");
    }
}
</script>
<style scoped>
.form-item {
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: 1rem;
    align-items: center;
}

input[type="text"],
input[type="password"] {
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

@media screen and (max-width: 600px) {
    .form-item {
        grid-template-columns: 1fr;
        gap: 0;
    }
}
</style>
