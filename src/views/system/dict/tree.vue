<script setup lang="ts">
import Edit from './edit.vue'
import { dictType } from '@/apis/system/dict'
import { deepTree, revDeepTree } from '@/utils'

const emit = defineEmits(['refresh'])

// const message = useMessage()

const treeRef = ref()
const editRef = ref()

const selectedKeys = ref<string[] | number[]>([])
const selectedAndChildrenKeys = ref<string[] | number[]>([])

const { loadList, onAdd, onEdit, onRemove, onRefresh } = useCrud({
  treeRef,
  editRef,
  api: dictType,
  formatListData: (list: any[]) => deepTree(list),
})

async function handleDelete(id: number | string) {
  onRemove([id] as number[] | string[], () => {
    if (unref(selectedKeys)?.[0] === id) {
      const ids = unref(treeRef).getData()?.[0]?.children ? revDeepTree(unref(treeRef).getData()?.[0]?.children).map(e => e.id) : []
      ids.unshift(unref(treeRef).getData()?.[0]?.id)
      selectedKeys.value = [unref(treeRef).getData()?.[0]?.id]
      selectedAndChildrenKeys.value = ids
      emit('refresh')
    }
  })
}

// async function handleDrop(nodes: any[]) {
//   try {
//     await department.order(nodes.map((item: any, index: number) => {
//       const { id, parentId } = item
//       return { id, parentId, orderNum: index }
//     }))
//     message.success('修改成功')
//   }
//   catch (err) {

//   }
// }

function handleUpdateSelectedKeys(_: any, options: any[]) {
  const ids = options?.[0]?.children ? revDeepTree(options?.[0]?.children).map(e => e.id) : []
  ids.unshift(options?.[0]?.id)
  selectedAndChildrenKeys.value = ids
  emit('refresh')
}

function getId() {
  return unref(selectedKeys)?.[0]
}

function getIds() {
  return unref(selectedAndChildrenKeys)
}

defineExpose({
  getId,
  getIds,
})
</script>

<template>
  <div class="h-full">
    <VTreeCrud
      ref="treeRef"
      v-model:selected-keys="selectedKeys"
      title="字典类型"
      key-field="id"
      label-field="name"
      default-expand-all
      permission="permission:department"
      :load="loadList"
      :delete="handleDelete"
      @add="onAdd"
      @edit="onEdit"
      @update:selected-keys="handleUpdateSelectedKeys"
    />
    <Edit
      ref="editRef"
      title="字典类型"
      @refresh="onRefresh"
    />
  </div>
</template>
