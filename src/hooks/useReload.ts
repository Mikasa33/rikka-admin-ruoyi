export const LAYOUT_ON_RELOAD_KEY = Symbol('LAYOUT_ON_RELOAD_KEY')

export function useReload() {
  const [isReload, toggle] = useToggle()

  async function onReload() {
    toggle(true)
    await nextTick()
    toggle(false)
  }

  return {
    LAYOUT_ON_RELOAD_KEY,
    isReload,
    onReload,
  }
}
