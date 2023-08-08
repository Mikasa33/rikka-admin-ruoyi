import type { TableDensityType, TableProps } from '../types'

export function useTableTools(props: TableProps) {
  const striped = ref(props.striped)
  const size = ref(props.size)

  function handleStriped(val: boolean) {
    striped.value = val
  }

  function handleDensity(val: TableDensityType) {
    size.value = val
  }

  return {
    striped,
    size,
    handleStriped,
    handleDensity,
  }
}
