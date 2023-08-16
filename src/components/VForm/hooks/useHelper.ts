import { isFunction, isUndefined } from 'lodash-es'
import type { IFormSchemaProps } from '../types'
import { isLayoutComponent, isSelectComponent } from '../helper'

export function useHelper(model: any) {
  function getProp(schema: IFormSchemaProps, prop: any, defaultValue?: any) {
    if (isUndefined(prop) && !isUndefined(defaultValue))
      return defaultValue

    if (isFunction(prop))
      prop = prop({ model: unref(model), field: schema.field })

    return prop
  }

  function getProps(schema: IFormSchemaProps) {
    let { label, component, props } = schema

    if (isFunction(props))
      props = props({ model: unref(model), field: schema.field })

    if (!props)
      props = {}

    const { placeholder } = props

    if (!placeholder) {
      props.placeholder = `请输入${label ?? ''}`

      if (isSelectComponent(component))
        props.placeholder = `请选择${label ?? ''}`
    }

    if (!isLayoutComponent(component))
      props.clearable = true

    return props
  }

  function getSlots(schema: IFormSchemaProps, slots: any) {
    if (isFunction(slots))
      slots = slots({ model: unref(model), field: schema.field })

    if (!slots)
      slots = {}

    return slots
  }

  return {
    getProp,
    getProps,
    getSlots,
  }
}
