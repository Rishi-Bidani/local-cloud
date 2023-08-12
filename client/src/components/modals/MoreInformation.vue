<template>
    <BaseModal :modal-name="'more-information'" :heading="'More Information'">
        <section></section>
    </BaseModal>
</template>
<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import BaseModal from "./BaseModal.vue";
</script>
<style scoped></style>
