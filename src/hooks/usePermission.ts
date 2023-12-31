export function usePermission() {
  const menuStore = useMenuStore()

  /**
   * 检查权限
   * @param accesses
   */
  function _somePermissions(accesses: string[]) {
    if (menuStore.permissions.includes('*:*:*'))
      return true

    return menuStore.permissions.some((item) => {
      return accesses.includes(item)
    })
  }

  /**
   * 判断是否存在权限
   * 可用于 v-if 显示逻辑
   * */
  function hasPermission(accesses: string[]): boolean {
    if (!accesses || !accesses.length)
      return true
    return _somePermissions(accesses)
  }

  /**
   * 是否包含指定的所有权限
   * @param accesses
   */
  function hasEveryPermission(accesses: string[]): boolean {
    const permissionsList = menuStore.permissions
    if (Array.isArray(accesses))
      return permissionsList.every((access: any) => accesses.includes(access.value))

    throw new Error(`[hasEveryPermission]: ${accesses} should be a array !`)
  }

  /**
   * 是否包含其中某个权限
   * @param accesses
   * @param accessMap
   */
  function hasSomePermission(accesses: string[]): boolean {
    const permissionsList = menuStore.permissions
    if (Array.isArray(accesses))
      return permissionsList.some((access: any) => accesses.includes(access.value))

    throw new Error(`[hasSomePermission]: ${accesses} should be a array !`)
  }

  return { hasPermission, hasEveryPermission, hasSomePermission }
}
