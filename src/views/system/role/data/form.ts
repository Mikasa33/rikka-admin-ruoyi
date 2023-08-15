import { dictData } from '@/apis/system/dict'
import { menu } from '@/apis/system/menu'
import { deepTree } from '@/utils'

let menuTree: any[] = []

export const formSchemas = [
  {
    field: 'roleId',
    visible: 'hidden',
  },
  {
    field: 'roleName',
    label: '名称',
    component: 'Input',
    rules: { required: true, message: '请输入名称', trigger: ['blur', 'input'] },
    giProps: {
      span: 12,
    },
  },
  {
    field: 'roleKey',
    label: '标识',
    component: 'Input',
    rules: { required: true, message: '请输入标识', trigger: ['blur', 'input'] },
    giProps: {
      span: 12,
    },
  },
  {
    field: 'roleSort',
    label: '排序',
    component: 'InputNumber',
    props: {
      class: 'w-full',
    },
    defaultValue: 0,
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
    giProps: {
      span: 12,
    },
  },
  {
    field: 'menuCheckStrictly',
    label: '父子联动',
    component: 'Switch',
    defaultValue: true,
  },
  {
    field: 'menuIds',
    label: '功能权限',
    component: 'Tree',
    props: ({ model }: any) => ({
      keyField: 'id',
      labelField: 'menuName',
      cascade: model.menuCheckStrictly,
      checkStrategy: 'parent',
      load: async () => {
        const list = await menu.list()
        menuTree = deepTree(list.map((item: any) => ({ ...item, id: item.menuId })))
        return menuTree
      },
    }),
    hook: {
      get: ({ model }: any) => {
        if (!model.menuIds?.length || !model.menuCheckStrictly)
          return

        const result = JSON.parse(JSON.stringify(model.menuIds))

        function loop(obj: any) {
          if (result.includes(obj.id)) {
            for (let j = 0; j < obj.children.length; j++) {
              result.push(obj.children[j].id)
              loop(obj.children[j])
            }
          }
        }

        for (let i = 0; i < menuTree.length; i++)
          loop(menuTree[i])

        model.menuIds = result
      },
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
    props: {
      type: 'textarea',
    },
  },
]
