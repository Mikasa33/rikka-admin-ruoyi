export const formSchemas = [
  {
    field: 'id',
    visible: 'hidden',
  },
  {
    field: 'parentId',
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
    field: 'orderNum',
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
    field: 'remark',
    label: '备注',
    component: 'Input',
    props: {
      type: 'textarea',
    },
  },
]
