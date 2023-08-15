<script setup lang="ts">
import DepartmentTree from '../department/tree.vue'
import { actionColumn, columns } from './data/table'
import { searchSchemas } from './data/search'
import Edit from './edit.vue'
import ResetPassword from './components/ResetPassword.vue'
import { user } from '@/apis/system/user'

const searchRef = ref()
const tableRef = ref()
const editRef = ref()
const treeRef = ref()
const resetPasswordRef = ref()
const idKey = 'userId'

const tab = reactive({
  value: 0,
  list: [
    { tab: '用户管理', slot: 'user' },
  ],
})

const searchQuery = computed(() => {
  return {
    ...unref(searchRef)?.getFieldsValue(),
    deptId: unref(treeRef)?.getId(),
  }
})

const { loadPage, onAdd, onEdit, onRemove, onExport, onRefresh } = useCrud({
  idKey,
  tableRef,
  editRef,
  api: user,
  pageQuery: searchQuery,
  exportQuery: searchQuery,
})

function handleResetPassword(params: any) {
  unref(resetPasswordRef)?.open({ ...unref(params), modalState: 'custom' })
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
        <DepartmentTree
          ref="treeRef"
          @refresh="onRefresh"
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
              :row-key="idKey"
              :load="loadPage"
              :columns="columns"
              :action-column="actionColumn({ idKey, onEdit, onRemove, handleResetPassword })"
            >
              <template #header>
                <VTableSearch
                  ref="searchRef"
                  :schemas="searchSchemas"
                />
                <NDivider class="!my-20px" />
              </template>
              <template #buttons>
                <NSpace>
                  <VTableAddBtn
                    v-permission="['system:user:add']"
                    @click="onAdd"
                  />
                  <VTableRemoveBtn
                    v-permission="['system:user:delete']"
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
              title="用户"
              @refresh="onRefresh"
            />

            <ResetPassword
              ref="resetPasswordRef"
              :id-key="idKey"
              title="重置密码"
              @refresh="onRefresh"
            />
          </template>
        </VTabsCard>
      </NGi>
    </NGrid>
  </div>
</template>
