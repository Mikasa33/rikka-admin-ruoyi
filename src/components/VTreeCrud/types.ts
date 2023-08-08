export interface TreeCurdProps {
  title?: string
  selectedKeys?: string[] | number[]
  draggable?: boolean
  load: (params?: any) => any[]
  delete?: (value: string | number) => void
  isAdd?: boolean
  isUpdate?: boolean
  isDelete?: boolean
  permission?: string
}
