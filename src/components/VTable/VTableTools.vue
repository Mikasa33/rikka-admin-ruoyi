<script lang="ts" setup>
import type { DataTableColumn } from 'naive-ui'
import type { TableDensityType, TableToolsProps } from './types'

withDefaults(defineProps<TableToolsProps>(), {
  columns: () => [],
})

const emit = defineEmits<{
  (evt: 'update:columns', value: DataTableColumn[]): void
  (evt: 'resetColumns'): void
  (evt: 'striped', value: boolean): void
  (evt: 'refresh'): void
  (evt: 'density', value: TableDensityType): void
}>()
</script>

<template>
  <NSpace
    align="center"
    justify="end"
    class="text-0"
  >
    <VTableToolsStriped @striped="(val: boolean) => emit('striped', val)" />
    <NDivider vertical />
    <VTableToolsRefresh @refresh="() => emit('refresh')" />
    <VTableToolsDensity @setting="(val: TableDensityType) => emit('density', val)" />
    <VTableToolsColumn
      :columns="columns"
      @update:columns="(val: any) => emit('update:columns', val)"
      @resetColumns="() => emit('resetColumns')"
    />
  </NSpace>
</template>
