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
  disabled: props.formProps?.readonly,
  ...props.formProps,
  class: [props.formProps?.class, props.formProps?.readonly ? 'form-readonly' : ''],
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

<style lang="less" scoped>
.form-readonly {
  :deep(.n-input) {
    &.n-input--disabled {
      cursor: default;

      .n-input__input-el,
      .n-input__textarea-el {
        color: var(--n-text-color);
        cursor: default;
      }
    }
  }

  :deep(.n-input-number) {
    .n-input__suffix {
      display: none;
    }
  }

  :deep(.n-select),
  :deep(.n-tree-select),
  :deep(.n-cascader) {
    .n-base-selection--disabled {
      cursor: default;

      .n-base-selection-label  {
        cursor: default;

        .n-base-selection-input {
          color: var(--n-text-color);
          cursor: default;
        }
      }

      .n-base-suffix {
        display: none;
      }
    }
  }

  :deep(.n-dynamic-tags) {
    .n-tag--disabled {
      cursor: default !important;
      opacity: 1;
    }

    .n-base-close--disabled {
      display: none;
    }

    .n-button--disabled {
      display: none;
    }
  }

  :deep(.n-date-picker),
  :deep(.n-time-picker) {
    .n-input--disabled {
      .n-input__suffix {
        display: none;
      }
    }
  }

  :deep(.n-switch) {
    &.n-switch--disabled {
      .n-switch__rail {
        opacity: 1;
      }
    }
  }

  :deep(.n-checkbox-group) {
    .n-checkbox--disabled {
      &.n-checkbox--checked {
        .n-checkbox-box {
          background-color: var(--n-color-checked);

          .check-icon {
            fill: var(--n-check-mark-color);
          }

          .n-checkbox-box__border {
            border: var(--n-border-checked);
          }
        }
      }

      .n-checkbox__label {
        color: var(--n-text-color);
      }
    }

    .n-checkbox-button--disabled {
      opacity: 1;
    }
  }

  :deep(.n-radio-group) {
    .n-radio--disabled {
      .n-radio__dot {
        &.n-radio__dot--checked {
          background-color: var(--n-color-active);
          box-shadow: var(--n-box-shadow-active);
        }

        &::before {
          background-color: var(--n-dot-color-active);;
        }
      }

      .n-radio__label {
        color: var(--n-text-color);
      }
    }

    .n-radio-button--disabled {
      opacity: 1;
    }
  }

  :deep(.n-slider) {
    &.n-slider--disabled {
      opacity: 1;
    }
  }
}
</style>
