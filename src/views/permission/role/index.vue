<script setup lang="ts">
import { actionColumn, columns } from './data/table'
import { searchSchemas } from './data/search'
import Edit from './edit.vue'
import { role } from '@/apis/permission/role'

const searchRef = ref()
const tableRef = ref()
const editRef = ref()

const tab = reactive({
  value: 0,
  list: [
    { tab: '角色管理', slot: 'role' },
  ],
})

const { loadPage, onAdd, onEdit, onRemove, onRefresh } = useCrud({
  tableRef,
  editRef,
  api: role,
  pageQuery: computed(() => {
    return {
      ...unref(searchRef)?.getFieldsValue(),
    }
  }),
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
          :load="loadPage"
          :columns="columns"
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
          title="角色"
          @refresh="onRefresh"
        />
      </template>
    </VTabsCard>
  </div>
</template>
