import { department } from '@/apis/system/department'
import { dictData } from '@/apis/system/dict'
import { role } from '@/apis/system/role'
import { deepTree } from '@/utils'

export const formSchemas = [
  {
    field: 'userId',
    visible: 'hidden',
  },
  {
    field: 'departmentId',
    visible: 'hidden',
  },
  {
    field: 'avatar',
    label: '头像',
    component: 'Upload',
    props: {
      listType: 'image-card',
      max: 1,
      accept: 'image/*',
    },
  },
  {
    field: 'userName',
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
    rules: { required: true, message: '请输入密码', trigger: ['blur', 'input'] },
    visible: ({ model }: any) => model.userId ? 'none' : 'visible',
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
    field: 'deptId',
    label: '部门',
    component: 'TreeSelect',
    props: {
      defaultExpandAll: true,
      keyField: 'id',
      labelField: 'deptName',
      load: async () => {
        const list = await department.list()
        return deepTree(list.map((item: any) => ({ ...item, id: item.deptId })))
      },
    },
    giProps: {
      span: 12,
    },
  },
  {
    field: 'roleIds',
    label: '角色',
    component: 'Select',
    props: {
      valueField: 'roleId',
      labelField: 'roleName',
      multiple: true,
      load: role.list,
    },
    giProps: {
      span: 12,
    },
  },
  // {
  //   field: 'postIds',
  //   label: '岗位',
  //   component: 'Select',
  //   props: {
  //     valueField: 'id',
  //     labelField: 'name',
  //     multiple: true,
  //     load: role.list,
  //   },
  //   giProps: {
  //     span: 12,
  //   },
  // },
  {
    field: 'phonenumber',
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
    field: 'sex',
    label: '性别',
    component: 'Radio',
    props: {
      valueField: 'dictValue',
      labelField: 'dictLabel',
      load: () => dictData.list({ dictType: 'sys_user_sex' }),
    },
    defaultValue: '2',
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
