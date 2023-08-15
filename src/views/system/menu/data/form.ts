import { menuCaches, menuStatus, menuTypes } from './dict'
import { dictData } from '@/apis/system/dict'
import { menu } from '@/apis/system/menu'
import { deepPaths, deepTree } from '@/utils'

function findFiles() {
  const files = import.meta.glob(['/src/views/**/*.vue', '!**/components'])
  const list: string[] = []

  for (const i in files)
    list.push(i.substring(10))

  return deepPaths(list)
}

export const formSchemas = [
  {
    field: 'menuId',
    visible: 'hidden',
  },
  {
    field: 'menuType',
    label: '类型',
    component: 'Radio',
    props: {
      options: menuTypes,
    },
    defaultValue: 'M',
  },
  {
    field: 'menuName',
    label: '名称',
    component: 'Input',
    rules: { required: true, message: '请输入名称', trigger: ['blur', 'input'] },
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    props: {
      keyField: 'id',
      labelField: 'menuName',
      load: async () => {
        const list = await menu.list()
        return deepTree(list.filter((item: any) => item.type !== 'F').map((item: any) => ({ ...item, id: item.menuId })))
      },
    },
    hook: {
      set: ({ model }: any) => {
        model.parentId = model.parentId ? Number(model.parentId) : null
      },
    },
  },
  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    rules: { required: true, message: '请输入路由地址', trigger: ['blur', 'input'] },
    visible: ({ model }: any) => model.menuType !== 'F' ? 'visible' : 'none',
  },
  {
    field: 'component',
    label: '文件路径',
    component: 'Cascader',
    props: {
      options: findFiles(),
      checkStrategy: 'child',
    },
    rules: { required: true, message: '请选择文件路径', trigger: ['blur', 'input'] },
    visible: ({ model }: any) => model.menuType === 'C' && model.isFrame === '1' ? 'visible' : 'none',
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconSelect',
    visible: ({ model }: any) => model.menuType !== 'F' ? 'visible' : 'none',
  },
  {
    field: 'orderNum',
    label: '排序',
    component: 'InputNumber',
    props: {
      min: 0,
      class: 'w-full',
    },
    defaultValue: 0,
  },
  {
    field: 'perms',
    label: '权限',
    component: 'DynamicTags',
    hook: {
      get: ({ model }: any) => {
        model.perms = model.perms?.toString()
      },
      set: ({ model }: any) => {
        model.perms = model.perms !== '' ? model.perms?.split(',') : []
      },
    },
    visible: ({ model }: any) => model.menuType !== 'M' ? 'visible' : 'none',
  },
  {
    field: 'isCache',
    label: '路由缓存',
    component: 'Radio',
    props: {
      options: menuCaches,
    },
    defaultValue: '1',
    visible: ({ model }: any) => model.menuType !== 'M' ? 'visible' : 'none',
    giProps: {
      span: 12,
    },
  },
  {
    field: 'isFrame',
    label: '是否外链',
    component: 'Radio',
    props: {
      options: menuStatus,
    },
    defaultValue: '1',
    visible: ({ model }: any) => model.menuType === 'C' ? 'visible' : 'none',
    giProps: {
      span: 12,
    },
  },
  {
    field: 'visible',
    label: '是否显示',
    component: 'Radio',
    props: {
      valueField: 'dictValue',
      labelField: 'dictLabel',
      load: () => dictData.list({ dictType: 'sys_show_hide' }),
    },
    defaultValue: '0',
    visible: ({ model }: any) => model.menuType !== 'F' ? 'visible' : 'none',
    giProps: {
      span: 12,
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Radio',
    props: {
      valueField: 'dictValue',
      labelField: 'dictLabel',
      load: () => dictData.list({ dictType: 'sys_normal_disable' }),
    },
    defaultValue: '0',
    visible: ({ model }: any) => model.menuType !== 'F' ? 'visible' : 'none',
    giProps: {
      span: 12,
    },
  },
]
