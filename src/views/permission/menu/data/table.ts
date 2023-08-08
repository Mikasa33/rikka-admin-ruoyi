import { NSpace, NTag } from 'naive-ui'
import dayjs from 'dayjs'
import { menuType, menuVisible } from './dict'
import { usePermission } from '@/hooks/usePermission'
import { VTableColumnAddBtn, VTableColumnEditBtn, VTableColumnRemoveBtn } from '@/components/VTable'

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
    width: 200,
    fixed: 'left',
    setting: false,
  },
  {
    key: 'icon',
    title: '图标',
    align: 'center',
    width: 80,
    render(row: any) {
      return h('div', { class: [row.icon, 'w-full'] })
    },
  },
  {
    key: 'type',
    title: '类型',
    align: 'center',
    width: 80,
    render(row: any) {
      const find = menuType.find((item: any) => item.value === row.type)
      return find ? h(NTag, { type: find.type, bordered: false }, () => find.label) : null
    },
  },
  {
    key: 'router',
    title: '节点路由',
    align: 'center',
  },
  {
    key: 'component',
    title: '文件路径',
    align: 'center',
    width: 300,
  },
  {
    key: 'visible',
    title: '显示',
    align: 'center',
    width: 80,
    render(row: any) {
      const find = menuVisible.find((item: any) => item.value === row.visible)
      return find ? h(NTag, { type: find.type, bordered: false }, () => find.label) : null
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
  {
    key: 'orderNum',
    title: '排序',
    align: 'center',
    width: 80,
  },
]

export function actionColumn({ onAdd, onEdit, onRemove }: any) {
  const { hasPermission } = usePermission()

  return {
    width: 210,
    render(row: any) {
      return h(NSpace, { align: 'center', justify: 'center' }, () => [
        row.type !== 'permission' && hasPermission(['permission:menu:add']) && h(VTableColumnAddBtn, { showIcon: false, onClick: () => onAdd({ info: { parentId: row.id } }) }),
        hasPermission(['permission:menu:update']) && h(VTableColumnEditBtn, { showIcon: false, onClick: () => onEdit({ id: row.id }) }),
        hasPermission(['permission:menu:delete']) && h(VTableColumnRemoveBtn, { showIcon: false, fn: () => onRemove([row.id]) }),
      ])
    },
  }
}
