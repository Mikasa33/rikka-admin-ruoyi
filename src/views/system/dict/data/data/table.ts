import { NSpace, NSwitch } from 'naive-ui'
import dayjs from 'dayjs'
import { usePermission } from '@/hooks/usePermission'
import { VTableColumnEditBtn, VTableColumnRemoveBtn } from '@/components/VTable'
import { dictData } from '@/apis/system/dict'

export const columns = [
  {
    type: 'selection',
    fixed: 'left',
    align: 'center',
    width: 50,
  },
  {
    key: 'dictLabel',
    title: '名称',
    align: 'center',
  },
  {
    key: 'dictValue',
    title: '标识',
    align: 'center',
  },
  {
    key: 'dictSort',
    title: '排序',
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
            await dictData.update({ ...row, status: val })
          }
          catch (err) {
            row.status = row.status === '0' ? '1' : '0'
          }
        },
      })
    },
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
]

export function actionColumn({ idKey, onEdit, onRemove }: any) {
  const { hasPermission } = usePermission()

  return {
    width: 140,
    render(row: any) {
      return h(NSpace, { align: 'center', justify: 'center' }, () => [
        hasPermission(['system:dict:update']) && h(VTableColumnEditBtn, { onClick: () => onEdit({ id: row[idKey] }) }),
        hasPermission(['system:dict:delete']) && h(VTableColumnRemoveBtn, { fn: () => onRemove([row[idKey]]) }),
      ])
    },
  }
}
