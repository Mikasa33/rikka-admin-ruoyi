import type { FormItemProps, FormProps, GridItemProps, GridProps } from 'naive-ui'

export type ComponentType = FormComponentType | LayoutComponentType
export type FormComponentType = 'Cascader' | 'Checkbox' | 'DynamicTags' | 'EditorWang' | 'IconSelect' | 'Input' | 'InputNumber' | 'Radio' | 'Select' | 'Switch' | 'Tree' | 'TreeSelect' | 'Upload'
export type NestComponentType = 'Collapse' | 'Tabs'
export type LayoutComponentType = 'Card' | 'Divider' | 'FormItem' | NestComponentType

export type visibleType = 'visible' | 'none' | 'hidden' // 显示、隐藏、隐藏保留值

export interface callbackParams {
  model: any
  field: string
}

export interface IFormProps {
  formProps?: FormProps
  gridProps?: GridProps
  schemas?: IFormSchemaProps[]
}
export interface IFormSchemaProps extends IFormComponentProps {
  field?: string
  label?: string
  visible?: visibleType | ((params: callbackParams) => visibleType)
  itemProps?: FormItemProps
  gridProps?: GridProps
  giProps?: GridItemProps
  slot?: string
}
export interface IFormComponentProps {
  component?: ComponentType
  props?: any | ((params: callbackParams) => any)
  slots?: any | ((params: callbackParams) => any)
  items?: any | ((params: callbackParams) => any)
}
