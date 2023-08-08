import { menuType } from './dict'
import { menu } from '@/apis/permission/menu'
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
    field: 'id',
    visible: 'hidden',
  },
  {
    field: 'type',
    label: '类型',
    component: 'Radio',
    props: {
      options: menuType,
    },
    defaultValue: 'catalog',
  },
  {
    field: 'name',
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
      labelField: 'name',
      load: async () => {
        const list = await menu.list()
        return deepTree(list.filter((item: any) => item.type !== 'permission'))
      },
    },
    hook: {
      set: ({ model }: any) => {
        model.parentId = model.parentId ? Number(model.parentId) : null
      },
    },
  },
  {
    field: 'router',
    label: '路由',
    component: 'Input',
    visible: ({ model }: any) => model.type !== 'permission' ? 'visible' : 'none',
  },
  // {
  //   field: 'keepAlive',
  //   label: '路由缓存',
  //   component: 'Switch',
  //   props: {
  //     checkedValue: 1,
  //     uncheckedValue: 0,
  //   },
  //   defaultValue: 1,
  // },
  {
    field: 'isShow',
    label: '是否显示',
    component: 'Switch',
    defaultValue: true,
    visible: ({ model }: any) => model.type !== 'permission' ? 'visible' : 'none',
  },
  {
    field: 'isFrame',
    label: '是否外链',
    component: 'Switch',
    defaultValue: false,
    visible: ({ model }: any) => model.type === 'menu' ? 'visible' : 'none',
  },
  {
    field: 'component',
    label: '文件路径',
    component: 'Cascader',
    props: {
      options: findFiles(),
      checkStrategy: 'child',
    },
    hook: {
      get: ({ model }: any) => {
        model.component = `/views${model.component}`
      },
      set: ({ model }: any) => {
        model.component = model.component?.replace(/\/views/g, '')
      },
    },
    rules: { required: true, message: '请选择文件路径', trigger: ['blur', 'input'] },
    visible: ({ model }: any) => model.type === 'menu' && !model.isFrame ? 'visible' : 'none',
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconSelect',
    visible: ({ model }: any) => model.type !== 'permission' ? 'visible' : 'none',
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
  // {
  //   field: 'perms',
  //   label: '权限',
  //   component: 'DynamicTags',
  //   hook: {
  //     get: ({ model }: any) => {
  //       model.perms = model.perms?.toString()
  //     },
  //     set: ({ model }: any) => {
  //       model.perms = model.perms?.split(',')
  //     },
  //   },
  //   visible: ({ model }: any) => model.type === 'permission' ? 'visible' : 'none',
  // },
]
