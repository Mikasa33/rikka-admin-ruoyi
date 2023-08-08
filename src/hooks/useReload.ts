export const LAYOUT_ON_RELOAD_KEY = Symbol('LAYOUT_ON_RELOAD_KEY')

export function useReload() {
  const [isReload, toggle] = useToggle()

  async function onReload() {
    toggle(true)
    setTimeout(() => {
      toggle(false)
    }, 10)
  }

  return {
    LAYOUT_ON_RELOAD_KEY,
    isReload,
    onReload,
  }
}
