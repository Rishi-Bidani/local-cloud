<template>
    <footer class="flex-column gap-1">
        <div class="footer-item settings">
            <img src="~@/assets/icons/settings.svg" alt="settings" />
            <span>settings</span>
        </div>
        <div v-if="!isLoggedIn" class="footer-item login flex" @click="() => $emit('click-login')">
            login
        </div>
        <div v-else class="footer-item logout flex" @click="logout()">logout</div>
    </footer>
</template>
<script setup lang="ts">
import { inject } from "vue";

const isLoggedIn = inject("isLoggedIn");
const logout: any = inject("logout");
</script>
<style scoped>
footer {
    margin-top: auto;
    justify-content: space-between;
    align-items: center;
    color: var(--white);
    /* height: 40px; */
}

/* footer > * {
    height: 100%;
} */

footer img {
    height: 20px;
}

.settings {
    --image-size: 20px;

    background-color: var(--accent-color);
    padding: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    display: grid;
    grid-template-columns: var(--image-size) 1fr;
    place-content: center;
    gap: 0.5rem;
    position: relative;
    isolation: isolate;
}

.settings span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.settings:hover {
    background-color: var(--accent-color-hover);
}

.logout,
.login {
    background-color: var(--accent-color);
    padding: 0.5rem;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    padding-inline: 1rem;
}

.logout {
    background-color: var(--accent-color-2);
}
</style>
