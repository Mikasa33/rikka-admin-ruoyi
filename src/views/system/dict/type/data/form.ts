import { dictData } from '@/apis/system/dict'

export const formSchemas = [
  {
    field: 'dictId',
    visible: 'hidden',
  },
  {
    field: 'dictName',
    label: '名称',
    component: 'Input',
    rules: { required: true, message: '请输入名称', trigger: ['blur', 'input'] },
    giProps: {
      span: 12,
    },
  },
  {
    field: 'dictType',
    label: '标识',
    component: 'Input',
    rules: { required: true, message: '请输入标识', trigger: ['blur', 'input'] },
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
    field: 'remark',
    label: '备注',
    component: 'Input',
    props: {
      type: 'textarea',
    },
  },
]
