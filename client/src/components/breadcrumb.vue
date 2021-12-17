<template>
    <section class="container margin-center">
        <span
            class="nav-item"
            v-for="(nav, index) in navigationPath"
            @click="this.$emit('navigation-link-clicked', nav, index)"
            :key="`nav-${index}`"
        >
            {{ nav }}&nbsp;>&nbsp;
        </span>
    </section>
</template>

<script>
export default {
    name: "BreadCrumb",
    props: ["navigationPath"],
};
</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
    max-height: 1rem;
    background-color: white;
    max-width: 90%;
    border-radius: 0.8rem;
    padding: 0.5rem;
}

.margin-center {
    margin: 0 auto;
}

.nav-item:hover {
    color: blueviolet;
    cursor: pointer;
}
</style>
