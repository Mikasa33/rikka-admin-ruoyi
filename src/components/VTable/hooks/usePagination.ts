import { merge } from 'lodash-es'

import type { PaginationProps } from 'naive-ui'
import type { TableProps } from '../types'
import { vTableSetting } from '@/settings/componentSetting'

export function usePagination(props: TableProps, load: () => void) {
  const defaultPagination = reactive({
    page: 1,
    pageSize: 10,
    itemCount: 0,
    pageSizes: [10, 20, 50, 100],
    showQuickJumper: true,
    showSizePicker: true,
    onUpdatePage: (page: number) => {
      defaultPagination.page = page
      load()
    },
    onUpdatePageSize: (pageSize: number) => {
      defaultPagination.page = 1
      defaultPagination.pageSize = pageSize
      load()
    },
  })
  const mergePagination = computed(() => props.pagination === false ? false : merge(defaultPagination, props.pagination))
  const paginationParams = computed(() => ({
    [vTableSetting.pageNumField]: (unref(mergePagination) as PaginationProps)?.page,
    [vTableSetting.pageSizeField]: (unref(mergePagination) as PaginationProps)?.pageSize,
  }))

  function getPagination() {
    return unref(paginationParams)
  }

  return {
    defaultPagination,
    mergePagination,
    paginationParams,
    getPagination,
  }
}
