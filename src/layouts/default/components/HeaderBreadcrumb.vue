<script setup lang="ts">
const route = useRoute()
const themeStore = useThemeStore()

const breadcrumbs = computed(() => {
  return route.matched.filter((item: any) => item.path && !item.meta?.hideBreadcrumb && !item.name?.includes('/rootMenu'))
})
</script>

<template>
  <div
    v-show="themeStore.breadcrumbVisible"
    class="h-40px flex-center rounded-40px bg-[rgba(46,51,56,.05)] dark:bg-[rgba(255,255,255,0.08)] px-16px"
  >
    <NBreadcrumb>
      <NBreadcrumbItem
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        :clickable="false"
        class="breadcrumb-item"
      >
        {{ breadcrumb.meta?.title }}
      </NBreadcrumbItem>
    </NBreadcrumb>
  </div>
</template>
