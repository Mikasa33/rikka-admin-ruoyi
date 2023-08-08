import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/open/login',
    method: 'post',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: {
          expire: 7200,
          token: 'token',
          refreshExpire: 1296000,
          refreshToken: 'refreshToken',
        },
      }
    },
  },
  {
    url: '/api/open/refreshToken',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        message: 'success',
        data: {
          expire: 7200,
          token: 'token',
          refreshExpire: 1296000,
          refreshToken: 'refreshToken',
        },
      }
    },
  },
] as MockMethod[]
