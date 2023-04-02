<template>
    <footer class="flex">
        <div class="footer-item settings">
            <img src="~@/assets/icons/settings.svg" alt="settings" />
        </div>
        <div v-if="!isLoggedIn" class="footer-item login flex" @click="() => $emit('click-login')">
            login
        </div>
        <div v-else class="footer-item logout flex" @click="logout">logout</div>
    </footer>
</template>
<script setup lang="ts">
import { Ref, ref } from "vue";

const isLoggedIn: Ref<boolean> = ref(false);

try {
    const token = localStorage.getItem("token");
    if (token) {
        isLoggedIn.value = true;
    }
} catch (error) {
    console.log(error);
    // TODO: handle error
}

function logout() {
    // ask for confirmation
    const confirmation = confirm("Are you sure you want to logout?");
    if (confirmation) {
        localStorage.removeItem("token");
        isLoggedIn.value = false;
    }
}
</script>
<style scoped>
footer {
    margin-top: auto;
    justify-content: space-between;
    align-items: center;
    height: 40px;
}

footer > * {
    height: 100%;
}

footer img {
    height: 100%;
}

.settings {
    background-color: var(--accent-color);
    padding: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
}

.settings:hover {
    background-color: var(--accent-color-hover);
}

.logout,
.login {
    color: var(--white);
    background-color: var(--accent-color);
    padding: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
    align-items: center;
    padding-inline: 1rem;
}

.logout {
    background-color: var(--accent-color-2);
}
</style>
