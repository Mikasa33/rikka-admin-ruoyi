import type { MockMethod } from 'vite-plugin-mock'

const menuList = [
  {
    id: 1,
    parentId: null,
    name: '工作台',
    type: 'menu',
    layout: '/layouts/default/index.vue',
    component: '/views/workbench/index.vue',
    router: '/workbench',
    icon: 'i-icon-park-outline-workbench',
    visible: true,
    orderNum: 1,
  },
  {
    id: 2,
    name: '权限管理',
    type: 'catalog',
    layout: '/layouts/default/index.vue',
    component: null,
    router: '/permission',
    icon: 'i-icon-park-outline-permissions',
    visible: true,
    orderNum: 2,
  },
  {
    id: 3,
    parentId: 2,
    name: '菜单管理',
    type: 'menu',
    layout: '/layouts/default/index.vue',
    component: '/views/permission/menu/index.vue',
    router: '/permission/menu',
    icon: 'i-icon-park-outline-list-one',
    visible: true,
    orderNum: 1,
  },
  {
    id: 4,
    parentId: 2,
    name: '用户管理',
    type: 'menu',
    layout: '/layouts/default/index.vue',
    component: '/views/permission/user/index.vue',
    router: '/permission/user',
    icon: 'i-icon-park-outline-user',
    visible: true,
    orderNum: 2,
  },
  {
    id: 5,
    parentId: 2,
    name: '角色管理',
    type: 'menu',
    layout: '/layouts/default/index.vue',
    component: '/views/permission/role/index.vue',
    router: '/permission/role',
    icon: 'i-icon-park-outline-peoples',
    visible: true,
    orderNum: 3,
  },
  {
    id: 6,
    parentId: null,
    name: '隐藏菜单',
    type: 'menu',
    layout: '/layouts/default/index.vue',
    component: '/views/test/index.vue',
    router: '/test',
    icon: 'i-icon-park-outline-list-two',
    visible: false,
    orderNum: 3,
  },
]

export default [
  {
    url: '/api/permission/menu/list',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: menuList,
      }
    },
  },
  {
    url: '/api/permission/menu/info',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: menuList.find((item: any) => item.id === Number(query.id)),
      }
    },
  },
  {
    url: '/api/permission/menu/add',
    method: 'post',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: {
          id: '@guid',
          ...body,
        },
      }
    },
  },
  {
    url: '/api/permission/menu/update',
    method: 'put',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: body,
      }
    },
  },
  {
    url: '/api/permission/menu/delete',
    method: 'delete',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
      }
    },
  },
] as MockMethod[]
