<template>
    <footer class="flex">
        <div class="footer-item settings">
            <img src="~@/assets/icons/settings.svg" alt="settings" />
        </div>
        <div class="footer-item login flex" @click="() => $emit('click-login')">login</div>
    </footer>
</template>
<script setup lang="ts"></script>
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

.login {
    color: var(--white);
    background-color: var(--accent-color);
    padding: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
    align-items: center;
    padding-inline: 1rem;
}
</style>
