<script setup lang="ts">
const modelValue = ref()
</script>

<template>
  <input
    id="input"
    v-model="modelValue"
    type="text"
    v-bind="$attrs"
    class="px-4 py-2 w-250px text-center bg-transparent border rounded border-gray-200 dark:border-gray-700 outline-none active:outline-none"
  >
</template>
