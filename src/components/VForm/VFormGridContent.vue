<script setup lang="ts">
import { V_FORM_MODAL } from '../inject'
import { isLayoutComponent, isVisible } from './helper'
import { useHelper } from './hooks/useHelper'
import type { IFormSchemaProps } from './types'

withDefaults(defineProps<IFormSchemaProps>(), {})

const model = inject(V_FORM_MODAL) as any

const { getProp } = useHelper(model)
</script>

<template>
  <NGrid
    :x-gap="12"
    responsive="screen"
    item-responsive
    v-bind="gridProps"
  >
    <template v-for="(schema, index) in (items as IFormSchemaProps)">
      <NGi
        v-if="isVisible(getProp(schema, schema.visible, 'visible'))"
        :key="index"
        :span="24"
        v-bind="schema.giProps"
      >
        <template #default="{ overflow }">
          <slot
            v-if="schema.slot"
            :name="schema.slot"
            :model="model"
            :field="schema.field"
            :overflow="overflow"
          />
          <VFormLayoutComponent
            v-else-if="isLayoutComponent(schema.component)"
            v-bind="schema"
          />
          <NFormItem
            v-else
            :path="schema.field"
            :label="schema.label"
            :rule="getProp(schema, schema.rules)"
            v-bind="schema.itemProps"
          >
            <VFormComponent v-bind="schema" />
          </NFormItem>
        </template>
      </NGi>
    </template>
  </NGrid>
</template>
