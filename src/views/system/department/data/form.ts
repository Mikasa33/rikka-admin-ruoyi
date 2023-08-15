import { department } from '@/apis/system/department'
import { dictData } from '@/apis/system/dict'
import { deepTree } from '@/utils'

export const formSchemas = [
  {
    field: 'deptId',
    visible: 'hidden',
  },
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    rules: { required: true, message: '请输入部门名称', trigger: ['blur', 'input'] },
    giProps: {
      span: 12,
    },
  },
  {
    field: 'parentId',
    label: '上级部门',
    component: 'TreeSelect',
    props: ({ model }: any) => ({
      defaultExpandAll: true,
      keyField: 'id',
      labelField: 'deptName',
      load: async () => {
        const list = await department.list()
        return deepTree(list.map((item: any) => ({ ...item, id: item.deptId })))
      },
    }),
    rules: { required: true, type: 'number', message: '请选择上级部门', trigger: ['blur', 'input'] },
    giProps: {
      span: 12,
    },
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
]
