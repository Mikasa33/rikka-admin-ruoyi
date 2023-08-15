import type { MockMethod } from 'vite-plugin-mock'

const roleList = [
  {
    id: 1,
    label: 'admin',
    name: '管理员',
  },
  {
    id: 2,
    label: 'test',
    name: '测试人员',
  },
  {
    id: 3,
    label: 'guest',
    name: '游客',
  },
]

export default [
  {
    url: '/api/permission/role/page',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: {
          list: roleList,
          pagination: {
            total: 3,
          },
        },
      }
    },
  },
  {
    url: '/api/permission/role/list',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: roleList,
      }
    },
  },
  {
    url: '/api/permission/role/info',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: roleList.find((item: any) => item.id === Number(query.id)),
      }
    },
  },
  {
    url: '/api/permission/role/add',
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
    url: '/api/permission/role/update',
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
    url: '/api/permission/role/delete',
    method: 'delete',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
      }
    },
  },
] as MockMethod[]
