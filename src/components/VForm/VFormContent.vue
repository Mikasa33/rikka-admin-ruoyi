<script setup lang="ts">
import { V_FORM_MODAL } from '../inject'
import { isLayoutComponent } from './helper'
import type { IFormSchemaProps } from './types'

withDefaults(defineProps<IFormSchemaProps>(), {})

const model = inject(V_FORM_MODAL) as any
</script>

<template>
  <template
    v-for="(schema, index) in (items as IFormSchemaProps)"
    :key="index"
  >
    <slot
      v-if="schema.slot"
      :name="schema.slot"
      :model="model"
      :field="schema.field"
    />
    <VFormLayoutComponent
      v-else-if="isLayoutComponent(schema.component)"
      v-bind="schema"
    />
    <NFormItem
      v-else
      :path="schema.field"
      :label="schema.label"
      v-bind="schema.itemProps"
    >
      <VFormComponent v-bind="schema" />
    </NFormItem>
  </template>
</template>
