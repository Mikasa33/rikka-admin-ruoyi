import { NCard, NDivider, NDynamicTags, NFormItem, NInput, NInputNumber, NSwitch } from 'naive-ui'
import type { IComponentType, IFormComponentType, ILayoutComponentType, INestComponentType } from './types'
import VFormCascader from './VFormCascader.vue'
import VFormCollapse from './VFormCollapse.vue'
import VFormSelect from './VFormSelect.vue'
import VFormTabs from './VFormTabs.vue'
import VFormCheckbox from './VFormCheckbox.vue'
import VFormEditorWang from './VFormEditorWang.vue'
import VFormRadio from './VFormRadio.vue'
import VFormTree from './VFormTree.vue'
import VFormTreeSelect from './VFormTreeSelect.vue'
import VFormUpload from './VFormUpload.vue'
import VFormIconSelect from './VFormIconSelect.vue'

export const selectComponent = new Map<IFormComponentType, Component>([
  ['Cascader', VFormCascader],
  ['Select', VFormSelect],
  ['Tree', VFormTree],
  ['TreeSelect', VFormTreeSelect],
])

export const formComponents = new Map<IFormComponentType, Component>([
  ['Checkbox', VFormCheckbox],
  ['DynamicTags', NDynamicTags],
  ['EditorWang', VFormEditorWang],
  ['IconSelect', VFormIconSelect],
  ['Input', NInput],
  ['InputNumber', NInputNumber],
  ['Radio', VFormRadio],
  ['Switch', NSwitch],
  ['Upload', VFormUpload],
  ...selectComponent,
])

export const nestComponents = new Map<INestComponentType, Component>([
  ['Collapse', VFormCollapse],
  ['Tabs', VFormTabs],
])

export const layoutComponents = new Map<ILayoutComponentType, Component>([
  ['Card', NCard],
  ['Divider', NDivider],
  ['FormItem', NFormItem],
  ...nestComponents,
])

export const components = new Map<IComponentType, Component>([
  ...formComponents,
  ...layoutComponents,
])
