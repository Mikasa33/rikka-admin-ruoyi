import { NAutoComplete, NCard, NColorPicker, NDatePicker, NDivider, NDynamicTags, NFormItem, NInput, NInputNumber, NSlider, NSwitch, NTimePicker } from 'naive-ui'
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
import VFormUploadImage from './VFormUploadImage.vue'
import VFormUploadFile from './VFormUploadFile.vue'
import VFormIconSelect from './VFormIconSelect.vue'

export const selectComponent = new Map<IFormComponentType, Component>([
  ['Cascader', VFormCascader],
  ['Select', VFormSelect],
  ['Tree', VFormTree],
  ['TreeSelect', VFormTreeSelect],
])

export const formComponents = new Map<IFormComponentType, Component>([
  ['AutoComplete', NAutoComplete],
  ['Checkbox', VFormCheckbox],
  ['ColorPicker', NColorPicker],
  ['DatePicker', NDatePicker],
  ['DynamicTags', NDynamicTags],
  ['EditorWang', VFormEditorWang],
  ['IconSelect', VFormIconSelect],
  ['Input', NInput],
  ['InputNumber', NInputNumber],
  ['Radio', VFormRadio],
  ['Slider', NSlider],
  ['Switch', NSwitch],
  ['TimePicker', NTimePicker],
  ['UploadImage', VFormUploadImage],
  ['UploadFile', VFormUploadFile],
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
