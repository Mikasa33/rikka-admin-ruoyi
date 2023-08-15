<script setup lang="ts">
import Edit from './edit.vue'
import { dictType } from '@/apis/system/dict'
import { deepTree } from '@/utils'

const emits = defineEmits(['refresh'])

const treeRef = ref()
const editRef = ref()
const idKey = 'dictId'

const selectedKeys = ref<string[] | number[]>([])
const selectedTypes = ref<string[]>([])

const { loadList, onAdd, onEdit, onRemove, onExport, onRefresh } = useCrud({
  idKey,
  tableRef: treeRef,
  editRef,
  api: dictType,
  formatListData: (list: any[]) => deepTree(list.map((item: any) => ({ ...item, id: item.dictId }))),
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
  selectedTypes.value = [options?.[0]?.dictType]
  emits('refresh')
}

function getType() {
  return unref(selectedTypes)?.[0]
}

defineExpose({
  getType,
})
</script>

<template>
  <div class="h-full">
    <VTreeCrud
      ref="treeRef"
      v-model:selected-keys="selectedKeys"
      title="字典类型"
      key-field="id"
      label-field="dictName"
      default-expand-all
      permission="system:dict"
      is-export
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
      title="字典类型"
      @refresh="onRefresh"
    />
  </div>
</template>
