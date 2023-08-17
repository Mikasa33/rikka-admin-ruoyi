import { userStatus } from './dict'
import { role } from '@/apis/permission/role'

export const formSchemas = [
  {
    field: 'id',
    visible: 'hidden',
  },
  {
    field: 'departmentId',
    visible: 'hidden',
  },
  {
    field: 'headImg',
    label: '头像',
    component: 'UploadImage',
    props: {
      max: 1,
    },
  },
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    rules: { required: true, message: '请输入姓名', trigger: ['blur', 'input'] },
    giProps: {
      span: 12,
    },
  },
  {
    field: 'nickName',
    label: '昵称',
    component: 'Input',
    rules: { required: true, message: '请输入昵称', trigger: ['blur', 'input'] },
    giProps: {
      span: 12,
    },
  },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    rules: { required: true, message: '请输入用户名', trigger: ['blur', 'input'] },
    giProps: {
      span: 12,
    },
  },
  {
    field: 'password',
    label: '密码',
    component: 'Input',
    props: {
      type: 'password',
    },
    rules: ({ model }: any) => model.id ? {} : { required: true, message: '请输入密码', trigger: ['blur', 'input'] },
    giProps: {
      span: 12,
    },
  },
  {
    field: 'roleIdList',
    label: '角色',
    component: 'Select',
    props: {
      valueField: 'id',
      labelField: 'name',
      multiple: true,
      load: role.list,
    },
    rules: { required: true, type: 'array', message: '请选择角色', trigger: ['blur', 'input'] },
  },
  {
    field: 'phone',
    label: '手机号码',
    component: 'Input',
    giProps: {
      span: 12,
    },
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
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
    field: 'status',
    label: '状态',
    component: 'Radio',
    props: {
      options: userStatus,
    },
    defaultValue: 1,
  },
]
