<script lang="ts" setup>
import type { DataTableColumn } from 'naive-ui'
import Draggable from 'vuedraggable'
import { isBoolean } from 'lodash-es'

const props = withDefaults(defineProps<{
  columns: DataTableColumn[]
}>(), {
  columns: () => [],
})

const emit = defineEmits<{
  (evt: 'update:columns', value: DataTableColumn[]): void
  (evt: 'resetColumns'): void
}>()

const showColumns = ref<string[]>([])

watch(
  () => props.columns,
  (val: any) => {
    showColumns.value = val.filter((item: any) => item.show).map((item: any) => item.key)
  },
  {
    immediate: true,
  },
)

function handleUpdateChecked() {
  const columns = props.columns
  columns.forEach((column: any) => {
    column.show = unref(showColumns).includes(column.key)
  })

  handleUpdateModelValue(columns)
}

function handleUpdateModelValue(val: DataTableColumn[]) {
  emit('update:columns', val)
}
</script>

<template>
  <NPopover
    trigger="click"
    placement="bottom-start"
    :show-arrow="false"
  >
    <template #trigger>
      <NTooltip trigger="hover">
        <template #trigger>
          <NButton
            text
            size="large"
            class="!ml-4px"
          >
            <div class="i-icon-park-outline-setting-two" />
          </NButton>
        </template>
        列设置
      </NTooltip>
    </template>
    <template #header>
      <NSpace justify="space-between">
        列展示
        <NButton
          text
          type="primary"
          @click="emit('resetColumns')"
        >
          重置
        </NButton>
      </NSpace>
    </template>
    <NCheckboxGroup
      v-model:value="showColumns"
      @update:value="handleUpdateChecked"
    >
      <Draggable
        :model-value="columns"
        item-key="key"
        handle=".handle"
        @update:model-value="handleUpdateModelValue"
      >
        <template #item="{ element }">
          <div
            v-if="!element.type"
            class="rounded-2px px-8px py-2px transition-base hover:bg-[rgba(24,160,88,0.15)]"
          >
            <NSpace align="center">
              <div v-if="isBoolean(element.setting) ? element.setting : true" class="handle i-icon-park-outline-drag cursor-move text-12px" />
              <div v-else class="pr-14px" />
              <NCheckbox
                :value="element.key"
                :disabled="isBoolean(element.setting) ? !element.setting : false"
                class="min-w-140px"
              >
                {{ element.title }}
              </NCheckbox>
            </NSpace>
          </div>
        </template>
      </Draggable>
    </NCheckboxGroup>
  </NPopover>
</template>
