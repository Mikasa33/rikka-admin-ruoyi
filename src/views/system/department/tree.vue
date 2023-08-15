<script setup lang="ts">
import Edit from './edit.vue'
import { department } from '@/apis/system/department'
import { deepTree } from '@/utils'

const emits = defineEmits(['refresh'])

const treeRef = ref()
const editRef = ref()
const idKey = 'deptId'

const selectedKeys = ref<string[] | number[]>([])

const { loadList, onAdd, onEdit, onRemove, onExport, onRefresh } = useCrud({
  idKey,
  tableRef: treeRef,
  editRef,
  api: department,
  formatListData: (list: any[]) => deepTree(list.map((item: any) => ({ ...item, id: item.deptId }))),
})

async function handleDelete(id: number | string) {
  onRemove([id] as number[] | string[], () => {
    if (unref(selectedKeys)?.[0] === id) {
      selectedKeys.value = [unref(treeRef).getData()?.[0]?.id]
      emits('refresh')
    }
  })
}

function handleUpdateSelectedKeys(_: any, options: any[]) {
  emits('refresh')
}

function getId() {
  return unref(selectedKeys)?.[0]
}

defineExpose({
  getId,
})
</script>

<template>
  <div class="h-full">
    <VTreeCrud
      ref="treeRef"
      v-model:selected-keys="selectedKeys"
      title="部门列表"
      key-field="id"
      label-field="deptName"
      default-expand-all
      permission="system:dept"
      :load="loadList"
      :delete="handleDelete"
      @add="onAdd"
      @edit="onEdit"
      @export="onExport"
      @update:selected-keys="handleUpdateSelectedKeys"
    />
    <Edit
      ref="editRef"
      :id-key="idKey"
      title="部门"
      @refresh="onRefresh"
    />
  </div>
</template>
