<script setup lang="ts">
defineOptions({
  name: '404',
})

const { t } = useI18n()
</script>

<template>
  <div>
    {{ t('not-found') }}
  </div>
</template>
