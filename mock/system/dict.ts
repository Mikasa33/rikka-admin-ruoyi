import type { MockMethod } from 'vite-plugin-mock'

const dictList = [
  {
    id: 1,
    parentId: null,
    name: '状态',
  },
  {
    id: 2,
    parentId: 1,
    name: '开启',
  },
  {
    id: 3,
    parentId: 1,
    name: '关闭',
  },
  {
    id: 4,
    parentId: null,
    name: '性别',
  },
  {
    id: 5,
    parentId: 4,
    name: '男',
  },
  {
    id: 6,
    parentId: 4,
    name: '女',
  },
  {
    id: 7,
    parentId: 4,
    name: '未知',
  },
]

export default [
  {
    url: '/api/system/dict/type/page',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: {
          list: dictList.filter((item: any) => !item.parentId),
          pagination: {
            total: 1,
          },
        },
      }
    },
  },
  {
    url: '/api/system/dict/type/list',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: dictList.filter((item: any) => !item.parentId),
      }
    },
  },
  {
    url: '/api/system/dict/type/info',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: dictList.find((item: any) => item.id === Number(query.id)),
      }
    },
  },
  {
    url: '/api/system/dict/type/add',
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
    url: '/api/system/dict/type/update',
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
    url: '/api/system/dict/type/delete',
    method: 'delete',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
      }
    },
  },
  {
    url: '/api/system/dict/info/page',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: {
          list: dictList.filter((item: any) => item.parentId === Number(query.parentId)),
          pagination: {
            total: 2,
          },
        },
      }
    },
  },
  {
    url: '/api/system/dict/info/list',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: dictList.filter((item: any) => item.parentId === Number(query.parentId)),
      }
    },
  },
  {
    url: '/api/system/dict/info/info',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: dictList.find((item: any) => item.id === Number(query.id)),
      }
    },
  },
  {
    url: '/api/system/dict/info/add',
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
    url: '/api/system/dict/info/update',
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
    url: '/api/system/dict/info/delete',
    method: 'delete',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
      }
    },
  },
] as MockMethod[]
