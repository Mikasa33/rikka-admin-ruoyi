<script lang="ts" setup>
import { V_FORM_MODAL, V_FORM_PROPS } from '../inject'
import type { IFormSchemaProps } from './types'
import { useHelper } from './hooks/useHelper'
import { getComponent } from './helper'

const props = withDefaults(defineProps<IFormSchemaProps>(), {})

const model = inject(V_FORM_MODAL) as any
const formProps = inject(V_FORM_PROPS) as any

const { getProps, getSlots } = useHelper(model)

function handleUpdateValue(val: any) {
  if (props.field)
    model.value[props.field] = val
}
</script>

<template>
  <Component
    :is="getComponent(component)"
    v-bind="getProps(props)"
    :placeholder="formProps.readonly ? '' : getProps(props)?.placeholder"
    :value="field ? model[field] : null"
    :items="items"
    @update:value="handleUpdateValue"
  >
    <template
      v-for="(slot, key) in getSlots(props, slots)"
      :key="key"
      #[key]="slotProps"
    >
      <Component
        :is="slot"
        v-bind="slotProps"
      />
    </template>
  </Component>
</template>
