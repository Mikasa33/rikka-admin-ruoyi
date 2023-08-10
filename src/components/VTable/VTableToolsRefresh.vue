<script lang="ts" setup>
const emit = defineEmits<{
  (evt: 'refresh'): void
}>()
</script>

<template>
  <NTooltip trigger="hover">
    <template #trigger>
      <NButton
        text
        size="large"
      >
        <div class="i-icon-park-outline-refresh" />
      </NButton>
    </template>
    刷新
  </NTooltip>
</template>
