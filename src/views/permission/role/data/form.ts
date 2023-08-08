import { menu } from '@/apis/permission/menu'
import { department } from '@/apis/permission/department'

export const formSchemas = [
  {
    field: 'id',
    visible: 'hidden',
  },
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    rules: { required: true, message: '请输入名称', trigger: ['blur', 'input'] },
    giProps: {
      span: 12,
    },
  },
  {
    field: 'label',
    label: '标识',
    component: 'Input',
    rules: { required: true, message: '请输入标识', trigger: ['blur', 'input'] },
    giProps: {
      span: 12,
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
  {
    field: 'menuIdList',
    label: '功能权限',
    component: 'Tree',
    props: {
      load: menu.list,
      keyField: 'id',
      labelField: 'name',
    },
  },
  {
    field: 'relevance',
    label: '数据权限',
    slot: 'customRelevance',
    defaultValue: 0,
    itemProps: {
      showFeedback: false,
      class: 'mb-4px',
    },
  },
  {
    field: 'departmentIdList',
    label: ' ',
    component: 'Tree',
    props: ({ model }: any) => ({
      load: department.list,
      keyField: 'id',
      labelField: 'name',
      cascade: !!model.relevance,
      checkStrategy: 'parent',
    }),
  },
]
