<script setup lang="ts">
import type { CascaderOption } from 'naive-ui'
import { NSpin } from 'naive-ui'

const props = withDefaults(defineProps<{
  options?: CascaderOption[]
  load?: () => Promise<CascaderOption[]>
}>(), {
  options: () => [],
})

const [loading, toggleLoading] = useToggle()

const options = ref<CascaderOption[]>([])

async function load() {
  if (!props.load) {
    options.value = props.options
    return
  }

  try {
    toggleLoading(true)
    options.value = await props.load()
  }
  catch (err) {

  }
  finally {
    toggleLoading(false)
  }
}

onMounted(() => {
  load()
})
</script>

<template>
  <NCascader
    v-bind="$attrs"
    :options="options"
  >
    <template #empty>
      <NSpin v-if="loading" size="small" />
      <NEmpty v-else />
    </template>

    <template
      v-for="(slot, key, index) in ($slots as any)"
      :key="index"
      #[key]="props"
    >
      <Component
        :is="slot"
        v-bind="props"
      />
    </template>
  </NCascader>
</template>
