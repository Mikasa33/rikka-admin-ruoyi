import { menuType } from './dict'
import type { IFormSchemaProps } from '@/components/VForm/types'

export const searchSchemas: IFormSchemaProps[] = [
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
  },
  {
    field: 'type',
    label: '菜单类型',
    component: 'Select',
    props: {
      options: menuType,
    },
  },
  {
    field: 'router',
    label: '节点路由',
    component: 'Input',
  },
  {
    field: 'router',
    label: '节点路由',
    component: 'Input',
  },
  {
    field: 'router',
    label: '节点路由',
    component: 'Input',
  },
  {
    field: 'router',
    label: '节点路由',
    component: 'Input',
  },
]
