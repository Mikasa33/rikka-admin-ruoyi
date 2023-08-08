<script lang="ts" setup>
const emit = defineEmits<{
  (evt: 'click'): void
}>()
</script>

<template>
  <NButton
    size="small"
    type="primary"
    tertiary
    v-bind="$attrs"
    @click="emit('click')"
  >
    编辑
  </NButton>
</template>
