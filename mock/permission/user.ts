import type { MockMethod } from 'vite-plugin-mock'

const userInfo = {
  id: '@guid',
  avatar: '@image("100x100")',
  username: '@first',
  name: '@last',
  nickName: '@name',
  phone: '@string("number", 11)',
}

export default [
  {
    url: '/api/permission/user/page',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: {
          'list|15': [userInfo],
          'pagination': {
            'total|15-40': 15,
          },
        },
      }
    },
  },
  {
    url: '/api/permission/user/info',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: {
          ...userInfo,
          id: query.id,
        },
      }
    },
  },
  {
    url: '/api/permission/user/add',
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
    url: '/api/permission/user/update',
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
    url: '/api/permission/user/delete',
    method: 'delete',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
      }
    },
  },
] as MockMethod[]
