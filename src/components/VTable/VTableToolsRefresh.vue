<script lang="ts" setup>
const emit = defineEmits<{
  (evt: 'refresh'): void
}>()
</script>

<template>
  <NTooltip trigger="hover">
    <template #trigger>
      <div
        class="i-icon-park-outline-refresh cursor-pointer text-16px transition-base hover:text-[#18a058]"
        @click="emit('refresh')"
      />
    </template>
    刷新
  </NTooltip>
</template>
