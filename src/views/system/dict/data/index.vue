<script setup lang="ts">
import DictTypeTree from '../type/tree.vue'
import { actionColumn, columns } from './data/table'
import { searchSchemas } from './data/search'
import Edit from './edit.vue'
import { dictData, dictType } from '@/apis/system/dict'

const message = useMessage()

const searchRef = ref()
const tableRef = ref()
const editRef = ref()
const treeRef = ref()
const idKey = 'dictCode'

const tab = reactive({
  value: 0,
  list: [
    { tab: '字典管理', slot: 'dict' },
  ],
})

const searchQuery = computed(() => {
  return {
    ...unref(searchRef)?.getFieldsValue(),
    dictType: unref(treeRef)?.getType(),
  }
})

const { loadPage, onAdd, onEdit, onRemove, onExport, onRefresh } = useCrud({
  idKey,
  tableRef,
  editRef,
  api: dictData,
  pageQuery: searchQuery,
  exportQuery: searchQuery,
})

async function handleRefresh() {
  await dictType.refreshCache()
  message.success('刷新缓存成功')
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
        <DictTypeTree
          ref="treeRef"
          @refresh="onRefresh"
        />
      </NGi>
      <NGi span="xs:24 m:16 l:18 xl:20">
        <VTabsCard
          v-model:value="tab.value"
          :tabs="tab.list"
        >
          <template #suffix>
            <div class="mr-24px">
              <NButton
                type="error"
                ghost
                size="small"
                @click="handleRefresh"
              >
                刷新缓存
              </NButton>
            </div>
          </template>
          <template #dict>
            <VTable
              ref="tableRef"
              :row-key="idKey"
              :load="loadPage"
              :columns="columns"
              :action-column="actionColumn({ idKey, onEdit, onRemove })"
              :init="false"
            >
              <template #header>
                <VTableSearch :schemas="searchSchemas" />
                <NDivider class="!my-20px" />
              </template>
              <template #buttons>
                <NSpace>
                  <VTableAddBtn
                    v-permission="['system:dict:add']"
                    @click="() => onAdd({ info: { dictType: treeRef?.getType() } })"
                  />
                  <VTableRemoveBtn
                    v-permission="['system:dict:delete']"
                    :fn="onRemove"
                  />
                  <VTableExportBtn
                    v-permission="['system:dict:export']"
                    @click="onExport"
                  />
                </NSpace>
              </template>
            </VTable>

            <Edit
              ref="editRef"
              :id-key="idKey"
              title="字典"
              @refresh="onRefresh"
            />
          </template>
        </VTabsCard>
      </NGi>
    </NGrid>
  </div>
</template>
