import { NSpace } from 'naive-ui'
import dayjs from 'dayjs'
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
    key: 'name',
    title: '名称',
    align: 'center',
  },
  {
    key: 'remark',
    title: '备注',
    align: 'center',
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
  {
    key: 'updateTime',
    title: '更新时间',
    align: 'center',
    width: 180,
    render(row: any) {
      return dayjs(row.updateTime).format('YYYY-MM-DD HH:mm:ss')
    },
  },
]

export function actionColumn({ onEdit, onRemove }: any) {
  const { hasPermission } = usePermission()

  return {
    width: 140,
    render(row: any) {
      return h(NSpace, { align: 'center', justify: 'center' }, () => [
        hasPermission(['permission:role:update']) && h(VTableColumnEditBtn, { showIcon: false, onClick: () => onEdit({ id: row.id }) }),
        hasPermission(['permission:role:delete']) && h(VTableColumnRemoveBtn, { showIcon: false, fn: () => onRemove([row.id]) }),
      ])
    },
  }
}
