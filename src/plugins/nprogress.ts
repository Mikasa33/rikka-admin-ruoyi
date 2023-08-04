import type { Router } from 'vue-router'

export function setupNprogress(router: Router) {
  router.beforeEach((to, from) => {
    if (to.path !== from.path)
      window.$loadingBar?.start()
  })

  router.afterEach(() => {
    window.$loadingBar?.finish()
  })
}
