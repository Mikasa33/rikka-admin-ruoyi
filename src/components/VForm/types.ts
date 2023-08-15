import type { FormItemProps, FormProps, GridItemProps, GridProps } from 'naive-ui'

export type IComponentType = IFormComponentType | ILayoutComponentType
export type IFormComponentType = 'Cascader' | 'Checkbox' | 'DynamicTags' | 'EditorWang' | 'IconSelect' | 'Input' | 'InputNumber' | 'Radio' | 'Select' | 'Switch' | 'Tree' | 'TreeSelect' | 'Upload'
export type INestComponentType = 'Collapse' | 'Tabs'
export type ILayoutComponentType = 'Card' | 'Divider' | 'FormItem' | INestComponentType

export type IVisibleType = 'visible' | 'none' | 'hidden' // 显示、隐藏、隐藏保留值

export interface IOption {
  value: any
  label: any
}

export interface ICallbackParams {
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
  visible?: IVisibleType | ((params: ICallbackParams) => IVisibleType)
  itemProps?: FormItemProps
  gridProps?: GridProps
  giProps?: GridItemProps
  slot?: string
}
export interface IFormComponentProps {
  component?: IComponentType
  props?: any | ((params: ICallbackParams) => any)
  slots?: any | ((params: ICallbackParams) => any)
  items?: any | ((params: ICallbackParams) => any)
}
