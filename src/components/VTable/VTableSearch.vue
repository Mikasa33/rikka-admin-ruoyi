<script lang="ts" setup>
import { V_TABLE_RELOAD, V_TABLE_SET_TABLE_HEIGHT } from '../inject'
import type { TableSearchProps } from './types'

const props = withDefaults(defineProps<TableSearchProps>(), {
  schemas: () => [],
})

const emits = defineEmits<{
  (evt: 'search', value: any): void
}>()

const formRef = ref()

const setTableHeight = inject<() => void>(V_TABLE_SET_TABLE_HEIGHT)
const reload = inject<(params: any) => void>(V_TABLE_RELOAD)

const [collapsed, toggle] = useToggle(true)
const expand = ref(false)

function handleSearch() {
  reload?.(unref(formRef).getFieldsValue())
  emits('search', unref(formRef).getFieldsValue())
}

function handleReset() {
  unref(formRef).reset()
  reload?.(unref(formRef).getFieldsValue())
}

async function handleToggle(overflow: boolean) {
  if (overflow)
    expand.value = overflow
  toggle()
  await nextTick()
  setTableHeight?.()
}

function getFieldsValue() {
  return unref(formRef).getFieldsValue()
}

onMounted(() => {
  unref(formRef).init([
    ...props.schemas.map((item: any) => ({
      ...item,
      giProps: {
        ...item?.giProps,
        span: 1,
      },
    })),
    {
      slot: 'action',
      giProps: {
        span: 1,
        suffix: true,
      },
    },
  ])
})

defineExpose({
  getFieldsValue,
})
</script>

<template>
  <VForm
    v-if="schemas?.length"
    ref="formRef"
    :form-props="{
      showFeedback: false,
      labelWidth: 'auto',
      ...formProps,
    }"
    :grid-props="{
      cols: 'xs:2 s:3 m:4 xl:5',
      collapsed,
      yGap: 12,
      ...gridProps,
    }"
  >
    <template
      v-for="(slot, key, index) in ($slots as any)"
      :key="index"
      #[key]="props"
    >
      <Component
        :is="slot"
        v-bind="props"
        :gi-props="{
          span: 1,
        }"
      />
    </template>
    <template #action="{ overflow }">
      <NSpace align="center" justify="end" class="w-full">
        <NButton
          type="primary"
          @click="handleSearch"
        >
          查询
        </NButton>
        <NButton @click="handleReset">
          重置
        </NButton>
        <NButton
          v-if="overflow || expand"
          text
          @click="handleToggle(overflow)"
        >
          {{ collapsed ? '展开' : '收缩' }}
          <div :class="collapsed ? 'i-icon-park-outline-down' : 'i-icon-park-outline-up'" />
        </NButton>
      </NSpace>
    </template>
  </VForm>
</template>
