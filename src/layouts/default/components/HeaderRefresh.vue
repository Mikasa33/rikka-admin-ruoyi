<script setup lang="ts">
const { LAYOUT_ON_RELOAD_KEY } = useReload()

const onReload = inject(LAYOUT_ON_RELOAD_KEY) as any
</script>

<template>
  <NButton
    tertiary
    circle
    size="large"
    @click="onReload"
  >
    <template #icon>
      <div class="i-icon-park-outline-redo" />
    </template>
  </NButton>
</template>
