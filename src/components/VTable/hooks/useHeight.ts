import { V_TABLE_SET_TABLE_HEIGHT } from '../../inject'

export function useHeight(elRef: any) {
  const { height: winHeight } = useWindowSize()

  const height = ref<number>(0)

  function setTableHeight() {
    const el = elRef?.value?.$el
    if (!el)
      return

    const headEl = el.querySelector('.n-data-table-wrapper')
    const bottomIncludeBody = unref(winHeight) - unref(headEl.getBoundingClientRect()?.top)
    const paddingH = 20
    const marginH = 16
    height.value = bottomIncludeBody - (paddingH + marginH)
  }

  onMounted(async () => {
    await nextTick()
    setTableHeight()
    window.addEventListener('resize', setTableHeight)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', setTableHeight)
  })

  provide(V_TABLE_SET_TABLE_HEIGHT, setTableHeight)

  return {
    height,
  }
}
