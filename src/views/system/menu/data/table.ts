import { NSpace, NSwitch, NTag } from 'naive-ui'
import dayjs from 'dayjs'
import { menuTypes } from './dict'
import { usePermission } from '@/hooks/usePermission'
import { VTableColumnAddBtn, VTableColumnEditBtn, VTableColumnRemoveBtn } from '@/components/VTable'
import { menu } from '@/apis/system/menu'

const { find } = useDict()

export function columns({ dicts }: any) {
  return [
    {
      key: 'menuName',
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
      key: 'orderNum',
      title: '排序',
      align: 'center',
      width: 80,
    },
    {
      key: 'perms',
      title: '权限标识',
      align: 'center',
    },
    {
      key: 'path',
      title: '路由',
      align: 'center',
    },
    {
      key: 'component',
      title: '文件路径',
      align: 'center',
      width: 300,
    },
    {
      key: 'menuType',
      title: '类型',
      align: 'center',
      width: 80,
      render(row: any) {
        const result = find(menuTypes, row.menuType)
        return result ? h(NTag, { type: result.type, bordered: false }, () => result.label) : null
      },
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
              await menu.update({ ...row, status: val })
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
}

export function actionColumn({ idKey, onAdd, onEdit, onRemove }: any) {
  const { hasPermission } = usePermission()

  return {
    width: 210,
    render(row: any) {
      return h(NSpace, { align: 'center', justify: 'center' }, () => [
        row.type !== 'permission' && hasPermission(['system:menu:add']) && h(VTableColumnAddBtn, { onClick: () => onAdd({ info: { parentId: row[idKey] } }) }),
        hasPermission(['system:menu:update']) && h(VTableColumnEditBtn, { onClick: () => onEdit({ id: row[idKey] }) }),
        hasPermission(['system:menu:delete']) && h(VTableColumnRemoveBtn, { fn: () => onRemove([row[idKey]]) }),
      ])
    },
  }
}
