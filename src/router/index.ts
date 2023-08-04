import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/default/index.vue'),
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('@/views/Home.vue'),
        },
        {
          path: '/about',
          name: 'About',
          component: () => import('@/views/About.vue'),
        },
        {
          path: '/hi/:name',
          name: 'Hi',
          component: () => import('@/views/Hi.vue'),
        },
      ],
    },
    {
      path: '/404',
      component: () => import('@/layouts/404.vue'),
      children: [
        {
          path: '/:pathMatch(.*)*',
          name: '404',
          component: () => import('@/views/404.vue'),
        },
      ],
    },
  ],
})

export default router
