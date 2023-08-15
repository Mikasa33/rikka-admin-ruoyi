<script setup lang="ts">
import { clone } from 'lodash-es'
import { V_FORM_MODAL, V_FORM_PROPS } from '../inject'
import type { IFormProps } from './types'
import { useHelper } from './hooks/useHelper'

const props = withDefaults(defineProps<IFormProps>(), {})

const formRef = ref()
const model = ref<any>({})
const schemas = ref<any[]>([])
const levelSchemas = ref<any[]>([])

const { getProp } = useHelper(model)

const defaultFormProps = computed(() => ({
  labelWidth: props.formProps?.inline ? 'auto' : 80,
  ...props.formProps,
}))

provide(V_FORM_MODAL, model)
provide(V_FORM_PROPS, defaultFormProps)

function init(scs: any[]) {
  if (scs)
    schemas.value = scs

  model.value = {}

  function loopSchemas(ss: any[]) {
    ss.forEach((schema: any) => {
      levelSchemas.value.push(schema)

      if (schema.field)
        model.value[schema.field] = schema.defaultValue ?? (schema.component === 'DynamicTags' ? [] : null)
      if (schema.items)
        loopSchemas(schema.items)
    })
  }

  loopSchemas(scs)
}

function reset(scs?: any[]) {
  init(scs || unref(schemas))
  formRef.value.restoreValidation()
}

async function validate() {
  try {
    await formRef.value.validate()
  }
  catch (error: any) {
    throw new Error(error)
  }
}

function getFieldsValue() {
  const cloneModel = clone(unref(model))

  for (let i = 0; i < unref(levelSchemas).length; i++) {
    const schema = unref(levelSchemas)[i]

    if (getProp(schema, schema.visible, 'visible') === 'none') {
      delete cloneModel[schema.field]
      continue
    }

    if (schema?.hook?.get)
      schema.hook.get({ model: cloneModel })
  }

  return cloneModel
}

function setFieldsValue(val: any) {
  for (const key in val) {
    const schema = unref(levelSchemas).find((schema: any) => schema.field === key)

    if (!schema)
      continue

    if (schema?.hook?.set) {
      try {
        schema.hook.set({ model: val })
      }
      catch (err: any) {
        console.error(`${schema.field} 执行 hook.set 失败`)
      }
    }

    model.value[schema.field] = val[schema?.field]
  }
}

defineExpose({
  init,
  reset,
  validate,
  getFieldsValue,
  setFieldsValue,
})
</script>

<template>
  <NForm
    ref="formRef"
    :model="model"
    label-placement="left"
    require-mark-placement="left"
    v-bind="defaultFormProps"
  >
    <VFormContent
      v-if="defaultFormProps?.inline"
      :items="schemas"
    >
      <template
        v-for="(slot, key, index) in ($slots as any)"
        :key="index"
        #[key]="props"
      >
        <Component
          :is="slot"
          v-bind="props"
        />
      </template>
    </VFormContent>
    <VFormGridContent
      v-else
      :grid-props="gridProps"
      :items="schemas"
    >
      <template
        v-for="(slot, key, index) in ($slots as any)"
        :key="index"
        #[key]="props"
      >
        <Component
          :is="slot"
          v-bind="props"
        />
      </template>
    </VFormGridContent>
  </NForm>
</template>
