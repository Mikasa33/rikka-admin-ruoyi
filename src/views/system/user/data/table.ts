import { NAvatar, NButton, NImage, NSpace, NSwitch } from 'naive-ui'
import dayjs from 'dayjs'
import { user } from '@/apis/system/user'
import { usePermission } from '@/hooks/usePermission'
import { VTableColumnEditBtn, VTableColumnRemoveBtn } from '@/components/VTable'

export const columns = [
  {
    type: 'selection',
    fixed: 'left',
    align: 'center',
    width: 50,
  },
  {
    key: 'avatar',
    title: '头像',
    align: 'center',
    width: 80,
    render(row: any) {
      return h(
        'div',
        { class: 'text-0px flex-center ' },
        row.avatar
          ? h(NImage, { src: row.avatar, objectFit: 'cover', width: 40, height: 40, style: { width: '40px', height: '40px', borderRadius: '3px' } })
          : h(NAvatar, null, () => row.nickName?.substring(0, 1)),
      )
    },
  },
  {
    key: 'userName',
    title: '用户名',
    align: 'center',
  },
  {
    key: 'nickName',
    title: '昵称',
    align: 'center',
  },
  {
    key: 'dept.deptName',
    title: '部门名称',
    align: 'center',
  },
  {
    key: 'phonenumber',
    title: '手机号',
    align: 'center',
  },
  {
    key: 'status',
    title: '状态',
    align: 'center',
    width: 80,
    render(row: any) {
      return h(NSwitch, {
        value: row.status,
        uncheckedValue: '1',
        checkedValue: '0',
        onUpdateValue: async (val: number) => {
          try {
            row.status = val
            await user.changeStatus({ ...row, status: val })
          }
          catch (err) {
            row.status = row.status === '0' ? '1' : '0'
          }
        },
      })
    },
  },
  {
    key: 'createTime',
    title: '创建时间',
    align: 'center',
    width: 180,
    render(row: any) {
      return dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
  },
]

export function actionColumn({ idKey, onEdit, onRemove, handleResetPassword }: any) {
  const { hasPermission } = usePermission()

  return {
    width: 240,
    render(row: any) {
      return h(NSpace, { align: 'center', justify: 'center' }, () => [
        hasPermission(['system:user:resetPwd']) && h(NButton, { type: 'primary', tertiary: true, onClick: () => handleResetPassword({ info: { [idKey]: row[idKey] } }) }, () => '重置密码'),
        hasPermission(['system:user:update']) && h(VTableColumnEditBtn, { onClick: () => onEdit({ id: row[idKey] }) }),
        hasPermission(['system:user:delete']) && h(VTableColumnRemoveBtn, { fn: () => onRemove([row[idKey]]) }),
      ])
    },
  }
}
