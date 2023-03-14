<script setup lang="ts">
import { inject } from "vue";

const currentPath = inject("currentPath");
</script>

<template>
  <div>{{ currentPath }}</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
