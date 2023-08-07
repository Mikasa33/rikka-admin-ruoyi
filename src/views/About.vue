<script setup lang="ts">
import axios from 'axios'

defineOptions({
  name: '404',
})

const result = ref()

axios('/api/demo?id=demo')
  .then((res: any) => {
    result.value = res.data
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
