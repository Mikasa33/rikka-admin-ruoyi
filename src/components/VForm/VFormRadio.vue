<script lang="ts" setup>
import { NRadio, NRadioButton } from 'naive-ui'
import type { IOption } from './types'

const props = withDefaults(defineProps<{
  value?: string | number | null
  options?: IOption[]
  load?: () => Promise<IOption[]>
  valueField?: string
  labelField?: string
  type?: 'button' | null
}>(), {
  options: () => [],
  valueField: 'value',
  labelField: 'label',
})

const emit = defineEmits(['update:value'])

const options = ref<IOption[]>([])

watch(
  () => props.options,
  (val: IOption[]) => {
    options.value = val
  },
  {
    immediate: true,
  },
)

async function load() {
  if (!props.load)
    return

  try {
    const result = await props.load()
    options.value = result?.map((item: any) => ({
      value: item[props.valueField],
      label: item[props.labelField],
      raw: item,
    }))
  }
  catch (err) {

  }
}

function handleUpdateValue(val: any) {
  emit('update:value', val)
}

function getComponent() {
  return props.type === 'button' ? NRadioButton : NRadio
}

onMounted(() => {
  load()
})
</script>

<template>
  <NRadioGroup
    :value="value"
    v-bind="$attrs"
    @update:value="handleUpdateValue"
  >
    <NSpace v-if="props.type !== 'button'">
      <Component
        :is="getComponent()"
        v-for="(opt, index) in options"
        :key="index"
        v-bind="opt"
      >
        {{ opt.label }}
      </Component>
    </NSpace>
    <template v-else>
      <Component
        :is="getComponent()"
        v-for="(opt, index) in options"
        :key="index"
        v-bind="opt"
      >
        {{ opt.label }}
      </Component>
    </template>
  </NRadioGroup>
</template>
