import { dictData } from '@/apis/system/dict'
import type { IFormSchemaProps } from '@/components/VForm/types'

export const searchSchemas: IFormSchemaProps[] = [
  {
    field: 'name',
    label: '菜单名称',
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
