<script setup lang="ts">
import { actionColumn, columns } from './data/table'
import { searchSchemas } from './data/search'
import Edit from './edit.vue'
import DeptTree from './components/DeptTree.vue'
import { user } from '@/apis/permission/user'

const searchRef = ref()
const tableRef = ref()
const editRef = ref()
const deptTreeRef = ref()

const tab = reactive({
  value: 0,
  list: [
    { tab: '用户管理', slot: 'user' },
  ],
})

const { loadPage, onAdd, onEdit, onRemove, onRefresh } = useCrud({
  tableRef,
  editRef,
  api: user,
  pageQuery: computed(() => {
    return {
      ...unref(searchRef)?.getFieldsValue(),
      departmentIds: unref(deptTreeRef)?.getIds(),
    }
  }),
})

function handleRefresh() {
  unref(tableRef).reload()
}
</script>

<template>
  <div class="m-16px">
    <NGrid
      :x-gap="16"
      :y-gap="16"
      item-responsive
      responsive="screen"
    >
      <NGi span="xs:24 m:8 l:6 xl:4">
        <DeptTree
          ref="deptTreeRef"
          @refresh="handleRefresh"
        />
      </NGi>
      <NGi span="xs:24 m:16 l:18 xl:20">
        <VTabsCard
          v-model:value="tab.value"
          :tabs="tab.list"
        >
          <template #user>
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
              title="用户"
              @refresh="onRefresh"
            />
          </template>
        </VTabsCard>
      </NGi>
    </NGrid>
  </div>
</template>
