import type { DataTableColumn, PaginationProps } from 'naive-ui'
import type { IFormProps } from '../VForm/types'

export interface TableProps {
  rowKey?: string
  columns?: DataTableColumn[] | any
  actionColumn?: DataTableColumn | any
  useTools?: boolean
  useStripedTool?: boolean
  striped?: boolean
  size?: 'medium' | 'small' | 'large'
  pagination?: PaginationProps | boolean
  load: (params: any) => Promise<{ list: any[]; pagination: any }>
  init?: boolean
  autoHeight?: boolean
  height?: string
}

export interface TableRemoveBtnProps {
  fn?: (value?: string[] | number[], callback?: (value?: string[] | number[]) => void) => Promise<void>
}

export interface TableToolsProps {
  columns: DataTableColumn[]
  useStripedTool?: boolean
}

export type TableDensityType = 'medium' | 'small' | 'large'

export interface TableSearchProps extends IFormProps {}
