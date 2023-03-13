<template>
    <section class="pc">
        <header>
            <h1>Local Cloud</h1>
        </header>
        <a href="/pictures" class="sidebar-item">pictures</a>
        <a href="/videos" class="sidebar-item">videos</a>
        <a href="/music" class="sidebar-item">music</a>
        <a href="/documents" class="sidebar-item">documents</a>

        <footer>
            <div class="footer-item">settings</div>
            <div class="footer-item">login</div>
        </footer>
    </section>
    <section class="mobile">
        <div class="mobile-item">settings</div>
        <div class="mobile-item">login</div>
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
.mobile-item {
    border-left: 1px solid var(--accent-color);
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.mobile-item:first-child {
    border-left: none;
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

a.sidebar-item {
    text-decoration: none;
    color: var(--primary-color);
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
