<script lang="ts" setup>
import { V_FORM_MODAL, V_FORM_PROPS } from '../inject'
import type { IFormSchemaProps } from './types'
import { useHelper } from './hooks/useHelper'
import { getComponent, isNestComponentType } from './helper'

const props = withDefaults(defineProps<IFormSchemaProps>(), {})

const model = inject(V_FORM_MODAL) as any
const formProps = inject(V_FORM_PROPS) as any

const { getProps, getSlots } = useHelper(model)
</script>

<template>
  <Component
    :is="getComponent(component)"
    v-bind="getProps(props)"
    :placeholder="formProps.readonly ? '' : getProps(props)?.placeholder"
    :items="items"
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

    <template v-if="!isNestComponentType(component)">
      <VFoContent
        v-if="formProps?.inline"
        :items="items"
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
      </VFoContent>
      <VFormGridContent
        v-else
        :grid-props="gridProps"
        :items="items"
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
    </template>
  </Component>
</template>
