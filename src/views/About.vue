<script setup lang="ts">
defineOptions({
  name: '404',
})

const { t } = useI18n()

const result = ref()

fetch('/api/demo?query=demo')
  .then(response => response.json())
  .then((data) => {
    result.value = data
  })
</script>

<template>
  <div class="text-center">
    <div class="i-carbon-dicom-overlay text-4xl m-auto" />
    <h3>About</h3>
    <div class="py-3" />
    <div>{{ result }}</div>
  </div>
</template>
