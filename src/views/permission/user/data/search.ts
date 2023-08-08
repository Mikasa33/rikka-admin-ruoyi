import type { IFormSchemaProps } from '@/components/VForm/types'

export const searchSchemas: IFormSchemaProps[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
  },
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
  },
  {
    field: 'nickName',
    label: '用户昵称',
    component: 'Input',
  },
  {
    field: 'phone',
    label: '手机号',
    component: 'Input',
  },
]
