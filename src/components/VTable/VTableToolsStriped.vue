<script lang="ts" setup>
const emit = defineEmits<{
  (evt: 'striped', value: boolean): void
}>()

const striped = ref(false)
</script>

<template>
  <NTooltip trigger="hover">
    <template #trigger>
      <NSwitch
        v-model:value="striped"
        @update:value="(val: boolean) => emit('striped', val)"
      />
    </template>
    表格斑马线
  </NTooltip>
</template>
