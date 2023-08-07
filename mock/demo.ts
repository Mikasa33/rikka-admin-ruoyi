import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/demo',
    method: 'get',
    response: ({ query, body }: any) => {
      return {
        code: 0,
        data: {
          query,
          body,
        },
      }
    },
  },
] as MockMethod[]
