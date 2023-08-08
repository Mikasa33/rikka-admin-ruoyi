import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import storage from '@/utils/storage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/workbench',
      component: () => import('@/layouts/default/index.vue'),
      meta: {
        hideBreadcrumb: true,
      },
      children: [
        {
          path: '/setting/user',
          name: 'SettingUser',
          component: () => import('@/views/setting/user.vue'),
          meta: {
            title: '个人设置',
            icon: 'i-icon-park-outline-setting-one',
          },
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/layouts/custom/index.vue'),
      children: [
        {
          path: '/login',
          name: 'Login',
          component: () => import('@/views/login/index.vue'),
          meta: {
            title: '登录',
            ignore: true,
          },
        },
      ],
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/views/exception/403.vue'),
    },
    {
      name: '500',
      path: '/500',
      component: () => import('@/views/exception/500.vue'),
    },
    {
      name: '502',
      path: '/502',
      component: () => import('@/views/exception/502.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/exception/404.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const menuStore = useMenuStore()

  // 忽略 Token 验证的页面
  if (to.meta.ignore)
    return next()

  // 未登录
  if (!userStore.token)
    return next('/login')

  // 跳转页面为登录页面，并且 Token 未过期
  if (to.path.includes('/login') && !storage.isExpired('token'))
    return next('/')

  // 没有用户信息
  if (!userStore.info)
    await userStore.getInfo()

  // 没有菜单信息
  if (!menuStore.isDynamicAddedRoute) {
    const routes: any[] = await menuStore.getRoutes()

    routes.forEach((route: any) => {
      router.addRoute(route as RouteRecordRaw)
    })

    menuStore.setDynamicAddedRoute(true)

    return next({ path: to.fullPath, replace: true, query: to.query })
  }

  next()
})

export default router
