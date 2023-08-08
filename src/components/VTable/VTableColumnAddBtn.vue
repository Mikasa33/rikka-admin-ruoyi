<script lang="ts" setup>
const emit = defineEmits<{
  (evt: 'click'): void
}>()
</script>

<template>
  <NButton
    size="small"
    type="info"
    tertiary
    v-bind="$attrs"
    @click="emit('click')"
  >
    新增
  </NButton>
</template>
