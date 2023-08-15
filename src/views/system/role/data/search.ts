import { dictData } from '@/apis/system/dict'
import type { IFormSchemaProps } from '@/components/VForm/types'

export const searchSchemas: IFormSchemaProps[] = [
  {
    field: 'roleName',
    label: '名称',
    component: 'Input',
  },
  {
    field: 'roleKey',
    label: '标识',
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    props: {
      valueField: 'dictValue',
      labelField: 'dictLabel',
      load: () => dictData.list({ dictType: 'sys_normal_disable' }),
    },
  },
]
