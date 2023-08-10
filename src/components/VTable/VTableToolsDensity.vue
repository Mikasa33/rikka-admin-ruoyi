<script lang="ts" setup>
import type { TableDensityType } from './types'

const emit = defineEmits<{
  (evt: 'setting', value: TableDensityType): void
}>()

const density = ref<TableDensityType>('medium')
const densityOptions = [
  {
    key: 'small',
    label: '紧凑',
  },
  {
    key: 'medium',
    label: '默认',
  },
  {
    key: 'large',
    label: '宽松',
  },
]

function handleSelectDensity(key: TableDensityType) {
  density.value = key
  emit('setting', unref(density))
}
</script>

<template>
  <NDropdown
    :value="density"
    :options="densityOptions"
    trigger="click"
    @select="handleSelectDensity"
  >
    <NTooltip trigger="hover">
      <template #trigger>
        <NButton
          text
          size="large"
          class="!ml-4px"
        >
          <div class="i-icon-park-outline-auto-height-one" />
        </NButton>
      </template>
      密度
    </NTooltip>
  </NDropdown>
</template>
