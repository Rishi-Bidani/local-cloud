<template>
    <dialog ref="dialog">
        <form action="/login" method="POST" @submit="loginSubmit">
            <header class="flex">
                <h2>Login</h2>
                <div class="close" @click="closeModal">X</div>
            </header>
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
            <button type="submit">Login</button>
        </form>
    </dialog>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

const dialog = ref<HTMLDialogElement | null>(null);

onMounted(() => {
    dialog.value = document.querySelector("dialog") as HTMLDialogElement;
});

function closeModal() {
    (dialog.value as HTMLDialogElement).close();
}

async function loginSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            username: formData.get("username"),
            password: formData.get("password"),
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response);
    // // check status
    if (response.status === 200) {
        const { accessToken } = await response.json();
        console.log(accessToken);
    } else if (response.status === 401) {
        console.log("Invalid credentials");
    } else {
        console.log("Something went wrong");
    }
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

.form-item {
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: 1rem;
    align-items: center;
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

@media screen and (max-width: 600px) {
    dialog {
        width: 100%;
        padding: 0.5rem;
    }

    .form-item {
        grid-template-columns: 1fr;
        gap: 0;
    }
}
</style>
