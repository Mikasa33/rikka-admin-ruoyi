<script setup lang="ts">
import { actionColumn, columns } from './data/table'
import { searchSchemas } from './data/search'
import Edit from './edit.vue'
import { menu } from '@/apis/permission/menu'
import { deepTree } from '@/utils'

const searchRef = ref()
const tableRef = ref()
const editRef = ref()

const tab = reactive({
  value: 0,
  list: [
    { tab: '菜单管理', slot: 'menu' },
  ],
})

const { loadList, onAdd, onEdit, onRemove, onRefresh } = useCrud({
  tableRef,
  editRef,
  api: menu,
  listQuery: computed(() => {
    return {
      ...unref(searchRef)?.getFieldsValue(),
    }
  }),
  formatListData: (list: any[]) => {
    list.forEach((item: any) => {
      item.permList = item.perms ? item.perms.split(',') : []
    })

    return {
      list: deepTree(list),
    }
  },
})
</script>

<template>
  <div class="m-16px">
    <VTabsCard
      v-model:value="tab.value"
      :tabs="tab.list"
    >
      <template #menu>
        <VTable
          ref="tableRef"
          :load="loadList"
          :columns="columns"
          :pagination="false"
          :action-column="actionColumn({ onEdit, onRemove })"
        >
          <template #header>
            <VTableSearch :schemas="searchSchemas" />
            <NDivider class="!my-20px" />
          </template>
          <template #buttons>
            <NSpace>
              <VTableAddBtn @click="onAdd" />
              <VTableRemoveBtn :fn="onRemove" />
            </NSpace>
          </template>
        </VTable>

        <Edit
          ref="editRef"
          title="菜单"
          @refresh="onRefresh"
        />
      </template>
    </VTabsCard>
  </div>
</template>
