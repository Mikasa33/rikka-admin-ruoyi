<script lang="ts" setup>
const emit = defineEmits<{
  (evt: 'click'): void
}>()
</script>

<template>
  <NButton
    type="warning"
    secondary
    @click="emit('click')"
  >
    导出
  </NButton>
</template>
