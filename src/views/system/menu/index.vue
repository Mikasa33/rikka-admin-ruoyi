<script setup lang="ts">
import { actionColumn, columns } from './data/table'
import { searchSchemas } from './data/search'
import Edit from './edit.vue'
import { menu } from '@/apis/system/menu'
import { deepTree } from '@/utils'

const { fetch, dicts } = useDict()

const searchRef = ref()
const tableRef = ref()
const editRef = ref()
const idKey = 'menuId'

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
      item.id = item.menuId
    })

    return {
      rows: deepTree(list),
    }
  },
})

fetch(['sys_show_hide'])
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
          :row-key="idKey"
          :load="loadList"
          :columns="columns({ dicts })"
          :pagination="false"
          :action-column="actionColumn({ idKey, onAdd, onEdit, onRemove })"
        >
          <template #header>
            <VTableSearch :schemas="searchSchemas" />
            <NDivider class="!my-20px" />
          </template>
          <template #buttons>
            <NSpace>
              <VTableAddBtn
                v-permission="['system:menu:add']"
                @click="onAdd"
              />
            </NSpace>
          </template>
        </VTable>

        <Edit
          ref="editRef"
          :id-key="idKey"
          title="菜单"
          @refresh="onRefresh"
        />
      </template>
    </VTabsCard>
  </div>
</template>
