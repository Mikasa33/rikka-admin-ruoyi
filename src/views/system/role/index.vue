<script setup lang="ts">
import { actionColumn, columns } from './data/table'
import { searchSchemas } from './data/search'
import Edit from './edit.vue'
import { role } from '@/apis/system/role'

const searchRef = ref()
const tableRef = ref()
const editRef = ref()
const idKey = 'roleId'

const tab = reactive({
  value: 0,
  list: [
    { tab: '角色管理', slot: 'role' },
  ],
})

const searchQuery = computed(() => {
  return {
    ...unref(searchRef)?.getFieldsValue(),
  }
})

const { loadPage, onAdd, onEdit, onRemove, onExport, onRefresh } = useCrud({
  idKey,
  tableRef,
  editRef,
  api: role,
  pageQuery: searchQuery,
  exportQuery: searchQuery,
})
</script>

<template>
  <div class="m-16px">
    <VTabsCard
      v-model:value="tab.value"
      :tabs="tab.list"
    >
      <template #role>
        <VTable
          ref="tableRef"
          :row-key="idKey"
          :load="loadPage"
          :columns="columns"
          :action-column="actionColumn({ idKey, onEdit, onRemove })"
        >
          <template #header>
            <VTableSearch :schemas="searchSchemas" />
            <NDivider class="!my-20px" />
          </template>
          <template #buttons>
            <NSpace>
              <VTableAddBtn
                v-permission="['system:role:add']"
                @click="onAdd"
              />
              <VTableRemoveBtn
                v-permission="['system:role:delete']"
                :fn="onRemove"
              />
              <VTableExportBtn
                v-permission="['system:role:export']"
                @click="onExport"
              />
            </NSpace>
          </template>
        </VTable>

        <Edit
          ref="editRef"
          :id-key="idKey"
          title="角色"
          @refresh="onRefresh"
        />
      </template>
    </VTabsCard>
  </div>
</template>
