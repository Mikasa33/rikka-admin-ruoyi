<script setup lang="ts">
import type { TabsCardProps } from './types'

defineProps<TabsCardProps>()

const emit = defineEmits<{
  (evt: 'update:value', value: number | string): void
}>()

const slots = useSlots()
const tabSlots = computed(() => {
  const ss = {}
  if (slots?.prefix)
    ss.prefix = slots?.prefix

  if (slots?.suffix)
    ss.suffix = slots?.suffix

  return ss
})
</script>

<template>
  <NCard
    :bordered="false"
    :content-style="{ padding: 0 }"
    v-bind="cardProps"
  >
    <NTabs
      type="line"
      size="large"
      :tabs-padding="24"
      :pane-style="{ padding: '20px 24px' }"
      v-bind="tabsProps"
      :value="value"
      @update:value="(val: any) => emit('update:value', val)"
    >
      <NTabPane
        v-for="(tab, index) in tabs"
        :key="tab.name || index"
        display-directive="show:lazy"
        v-bind="tab"
        :name="tab.name || index"
        :tab-props="{ style: { fontWeight: 500 } }"
      >
        <slot :name="tab.slot" />
      </NTabPane>
      <template
        v-for="(slot, key, index) in tabSlots"
        :key="index"
        #[key]="props"
      >
        <Component
          :is="slot"
          v-bind="props"
        />
      </template>
    </NTabs>
  </NCard>
</template>
