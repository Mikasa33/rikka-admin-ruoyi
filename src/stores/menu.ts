import { orderBy } from 'lodash-es'
import DefaultLayout from '@/layouts/default/index.vue'
import { listPermmenu } from '@/apis/comm'
import { deepTree } from '@/utils'
import { renderIcon } from '@/utils/icon'
import storage from '@/utils/storage'

let layouts: any
let views: any

const data = storage.info()

export const useMenuStore = defineStore('menu', () => {
  const isDynamicAddedRoute = ref(false)
  const list = ref<any[]>([])
  const permissions = ref<any[]>(data.permissions || [])

  function setDynamicAddedRoute(val: boolean) {
    isDynamicAddedRoute.value = val
  }

  function setPermissions(list: any[]) {
    permissions.value = list
    // storage.set('permissions', list)
  }

  function transformObjToMenu(routes: any[]) {
    const menuList: any[] = []

    for (let i = 0; i < routes.length; i++) {
      const { name: title, type: menuType, router: key, icon, visible } = routes[i]

      if (!visible)
        continue

      const menu = {
        ...routes[i],
        key,
        title,
        menuType,
        icon: renderIcon(icon),
      }

      delete menu.type

      menuList.push(menu)
    }

    return orderBy(deepTree(menuList), 'orderNum')
  }

  function transformObjToRoute(routes: any[]): any[] {
    layouts = layouts || import.meta.glob(['/src/layouts/**/index.vue'])
    views = views || import.meta.glob(['/src/views/**/*', '!**/components'])

    const routerList = []
    for (let i = 0; i < routes.length; i++) {
      let { parentId, title, menuType, icon, isFrame, layout, component, router, children } = routes[i]
      const layoutComp = layouts[`/src/layouts${layout}`] || DefaultLayout
      const comp = views[`/src/views${component}`]

      const meta = { title, icon, isFrame }

      children = children?.length ? transformObjToRoute(children) : []

      if (isFrame)
        continue

      if (menuType === 'catalog') {
        routerList.push({
          name: router,
          path: router,
          redirect: children?.[0]?.router,
          component: !parentId && layoutComp,
          meta,
          children,
        })
      }
      else if (menuType === 'menu') {
        if (parentId) {
          routerList.push({
            name: router,
            path: router,
            component: comp,
            meta,
            children,
          })
        }
        else {
          routerList.push({
            name: `/rootMenu${router}`,
            path: router,
            redirect: router,
            component: layoutComp,
            children: [
              {
                name: router,
                path: router,
                component: comp,
                meta,
              },
            ],
          })
        }
      }
    }

    return routerList
  }

  async function getRoutes() {
    const { message } = useDiscreteApi()
    const msg = message.loading('加载菜单中...', {
      duration: 0,
    })

    try {
      const { menus, perms } = await listPermmenu()

      setPermissions(perms || [])

      list.value = transformObjToMenu(menus.filter((menu: any) => menu.type !== 'permission'))

      const routes = transformObjToRoute(unref(list))

      return routes
    }
    catch (err) {
    }
    finally {
      msg.destroy()
    }
  }

  return {
    isDynamicAddedRoute,
    list,
    permissions,
    setDynamicAddedRoute,
    getRoutes,
  }
})
