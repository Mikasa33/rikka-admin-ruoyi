<script lang="ts" setup>
import { V_TABLE_CHECKED_ROW_KEYS } from '../inject'
import type { TableRemoveBtnProps } from './types'

const props = withDefaults(defineProps<TableRemoveBtnProps>(), {})

const emit = defineEmits<{
  (evt: 'click'): void
  (evt: 'cancel'): void
}>()

const dialog = useDialog()

const checkedRowKey = inject<string[] | number[]>(V_TABLE_CHECKED_ROW_KEYS)

function handleClick() {
  const d = dialog.warning({
    autoFocus: false,
    title: '提示',
    content: '是否确认删除已选数据？',
    positiveText: '确 认',
    negativeText: '取 消',
    onPositiveClick: async () => {
      d.loading = true
      await props.fn?.(unref(checkedRowKey) || [])
    },
    onNegativeClick: () => {
      emit('cancel')
    },
  })
}
</script>

<template>
  <NButton
    type="error"
    secondary
    :disabled="!checkedRowKey?.length"
    @click="handleClick"
  >
    删除
  </NButton>
</template>
