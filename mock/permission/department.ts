import type { MockMethod } from 'vite-plugin-mock'

const departmentList = [
  {
    id: 1,
    parentId: null,
    name: 'Void',
  },
  {
    id: 2,
    parentId: 1,
    name: '研发',
  },
  {
    id: 3,
    parentId: 2,
    name: '测试',
  },
  {
    id: 4,
    parentId: 1,
    name: '游客',
  },
]

export default [
  {
    url: '/api/permission/department/list',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: departmentList,
      }
    },
  },
  {
    url: '/api/permission/department/info',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: departmentList.find((item: any) => item.id === Number(query.id)),
      }
    },
  },
  {
    url: '/api/permission/department/add',
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
    url: '/api/permission/department/update',
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
    url: '/api/permission/department/delete',
    method: 'delete',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
      }
    },
  },
] as MockMethod[]
