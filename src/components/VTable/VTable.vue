<script setup lang="ts">
import { NSpace } from 'naive-ui'
import { get } from 'lodash-es'
import { V_TABLE_CHECKED_ROW_KEYS, V_TABLE_RELOAD } from '../inject'
import { useCheckedRow } from './hooks/useCheckedRow'
import { useColumn } from './hooks/useColumn'
import { useHeight } from './hooks/useHeight'
import { usePagination } from './hooks/usePagination'
import { useSort } from './hooks/useSort'
import { useTableTools } from './hooks/useTableTools'
import type { TableProps } from './types'
import { vTableSetting } from '@/settings/componentSetting'

const props = withDefaults(defineProps<TableProps>(), {
  rowKey: 'id',
  actionColumn: undefined,
  useTools: true,
  striped: false,
  size: 'medium',
  pagination: undefined,
  init: true,
  autoHeight: true,
})

const tableRef = ref()
const { height: tableHeight } = useHeight(tableRef)
const { defaultColumns, filterColumns, handleResetColumns } = useColumn(props)
const { defaultPagination, mergePagination, paginationParams, getPagination } = usePagination(props, load)
const { sort, handleUpdateSorter } = useSort(defaultColumns, reload)
const { checkedRowKeys, getCheckedRowKeys, setCheckedRowKeys } = useCheckedRow()
const { striped, size, handleStriped, handleDensity } = useTableTools(props)
const [loading, toggleLoading] = useToggle()
const data = ref<any[]>([])
const scrollX = computed(() => unref(defaultColumns).map((item: any) => item?.width ?? 200).reduce((pre: any, current: any) => pre + current, null) + props.actionColumn?.width)

function getRowKey(row: any) {
  return row[props.rowKey]
}

function getData() {
  return unref(data)
}

async function load(params?: any) {
  checkedRowKeys.value = []
  try {
    toggleLoading(true)
    const result: any = await props.load({ ...unref(paginationParams), ...unref(sort), ...params })
    data.value = result[vTableSetting.listField]
    defaultPagination.itemCount = get(result, vTableSetting.pageTotalField)
  }
  catch (err) {

  }
  finally {
    toggleLoading(false)
  }
}

async function reload(params?: any) {
  defaultPagination.page = 1
  await load(params)
}

onMounted(() => {
  props.init && load()
})

provide(V_TABLE_CHECKED_ROW_KEYS, checkedRowKeys)
provide(V_TABLE_RELOAD, reload)

defineExpose({
  getData,
  getCheckedRowKeys,
  setCheckedRowKeys,
  getPagination,
  load,
  reload,
})
</script>

<template>
  <div>
    <slot name="header" />

    <NSpace
      v-if="$slots.buttons || $slots.tools || useTools"
      align="center"
      justify="space-between"
      class="mb-12px"
    >
      <div>
        <slot name="buttons" />
      </div>
      <NSpace align="center">
        <slot name="tools-before" />
        <NDivider
          v-if="$slots['tools-before'] && !$slots.tools && useTools"
          vertical
        />
        <slot
          v-if="$slots.tools"
          name="tools"
        />
        <VTableTools
          v-else-if="useTools"
          v-model:columns="defaultColumns"
          :use-striped-tool="useStripedTool"
          @striped="handleStriped"
          @refresh="load"
          @density="handleDensity"
          @resetColumns="handleResetColumns"
        />
        <slot name="tools-after" />
      </NSpace>
    </NSpace>
    <NDataTable
      ref="tableRef"
      v-bind="$attrs"
      v-model:checked-row-keys="checkedRowKeys"
      :row-key="getRowKey"
      :columns="filterColumns"
      :loading="loading"
      :data="data"
      :pagination="mergePagination"
      :striped="striped"
      :size="size"
      :scroll-x="scrollX"
      remote
      flex-height
      :style="{
        height: autoHeight ? `${tableHeight}px` : null,
        minHeight: '300px',
      }"
      @update:sorter="handleUpdateSorter"
    />

    <slot name="footer" />
  </div>
</template>
