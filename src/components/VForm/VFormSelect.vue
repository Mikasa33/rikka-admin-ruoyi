<script setup lang="ts">
import type { SelectOption } from 'naive-ui'
import { NSpin } from 'naive-ui'

const props = withDefaults(defineProps<{
  options?: SelectOption[]
  load?: () => Promise<SelectOption[]>
}>(), {
  options: () => [],
})

const [loading, toggleLoading] = useToggle()

const options = ref<SelectOption[]>([])

watch(
  () => props.options,
  (val: SelectOption[]) => {
    options.value = val
  },
  {
    immediate: true,
  },
)

async function load() {
  if (!props.load)
    return

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
  <NSelect
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
  </NSelect>
</template>
