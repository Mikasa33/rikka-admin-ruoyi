<script setup lang="ts">
const themeStore = useThemeStore()
</script>

<template>
  <NLayout>
    <NLayoutContent :content-style="{ minHeight: '100vh', backgroundColor: themeStore.isDark ? '#101014' : '#f0f2f5' }">
      <RouterView />
    </NLayoutContent>
  </NLayout>
</template>
