import { department } from '@/apis/permission/department'
import { deepTree } from '@/utils'

export const formSchemas = [
  {
    field: 'id',
    visible: 'hidden',
  },
  {
    field: 'name',
    label: '部门名称',
    component: 'Input',
    rules: { required: true, message: '请输入部门名称', trigger: ['blur', 'input'] },
  },
  {
    field: 'parentId',
    label: '上级部门',
    component: 'TreeSelect',
    props: ({ model }: any) => ({
      disabled: !!model.id,
      defaultExpandAll: true,
      keyField: 'id',
      labelField: 'name',
      load: async () => {
        const list = await department.list()
        return deepTree(list)
      },
    }),
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
]
