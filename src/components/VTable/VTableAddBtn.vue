<script lang="ts" setup>
const emit = defineEmits<{
  (evt: 'click'): void
}>()
</script>

<template>
  <NButton
    type="primary"
    @click="emit('click')"
  >
    新增
  </NButton>
</template>
