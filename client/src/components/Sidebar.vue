<template>
    <section class="pc">
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
    <section class="mobile">
        <div class="footer-item">settings</div>
        <div class="footer-item">login</div>
    </section>
</template>
<script setup lang="ts"></script>
<style scoped>
section.pc,
section.mobile {
    background-color: var(--secondary-color);
}
section.pc {
    display: none;
}

section.mobile {
    --height: 50px;
    width: 100%;
    height: var(--height);
    position: absolute;
    bottom: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
}

@media screen and (min-width: 768px) {
    section.mobile {
        display: none;
    }

    section.pc {
        width: 300px;
        height: 100%;
        padding: 1em 2em;
        display: flex;
        flex-direction: column;
    }
}

header {
    padding-block: 1rem;
    font-weight: 900;
}

.sidebar-item {
    text-transform: capitalize;
    padding-block: 1rem;
    font-weight: 700;
    cursor: pointer;
}

footer {
    margin-top: auto;
}
</style>
