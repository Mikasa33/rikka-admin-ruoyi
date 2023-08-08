import type { IFormSchemaProps } from '@/components/VForm/types'

export const searchSchemas: IFormSchemaProps[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
  },
  {
    field: 'label',
    label: '标识',
    component: 'Input',
  },
]
