<template>
    <section class="flex-column">
        <header>
            <h1>Local Cloud</h1>
        </header>
        <div class="sidebar-item">pictures</div>
        <div class="sidebar-item">videos</div>
        <div class="sidebar-item">music</div>
        <div class="sidebar-item">documents</div>

        <footer>
            <div class="footer-item">settings</div>
            <div class="footer-item">login</div>
        </footer>
    </section>
</template>
<script setup lang="ts"></script>
<style scoped>
section {
    background-color: var(--secondary-color);
    width: 300px;
    height: 100%;
    padding: 1em 2em;
}

header {
    padding-block: 1rem;
    font-weight: 900;
}

.sidebar-item {
    text-transform: capitalize;
    padding-block: 1rem;
    font-weight: 700;
}

footer {
    margin-top: auto;
}
</style>
